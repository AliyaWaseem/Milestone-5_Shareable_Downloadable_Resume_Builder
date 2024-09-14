var _a, _b, _c;
var currentResumeData = null;
// Variables to keep track of the number of entries
var workExperienceCount = 1;
var educationCount = 1;
// Function to add more work experience fields
(_a = document.getElementById('add-work-experience')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    workExperienceCount++;
    var container = document.getElementById('work-experience-container');
    var newExperience = document.createElement('div');
    newExperience.classList.add('work-experience-item');
    newExperience.innerHTML = "\n        <label for=\"job-title-".concat(workExperienceCount, "\">Job Title:</label>\n        <input type=\"text\" id=\"job-title-").concat(workExperienceCount, "\" placeholder=\"Job Title\" required>\n\n        <label for=\"company-").concat(workExperienceCount, "\">Company:</label>\n        <input type=\"text\" id=\"company-").concat(workExperienceCount, "\" placeholder=\"Company Name\" required>\n\n        <label for=\"duration-").concat(workExperienceCount, "\">Duration:</label>\n        <input type=\"text\" id=\"duration-").concat(workExperienceCount, "\" placeholder=\"Duration (e.g., 2019-2021)\" required>\n    ");
    container.appendChild(newExperience);
});
// Function to add more education fields
(_b = document.getElementById('add-education')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    educationCount++;
    var container = document.getElementById('education-container');
    var newEducation = document.createElement('div');
    newEducation.classList.add('education-item');
    newEducation.innerHTML = "\n        <label for=\"degree-".concat(educationCount, "\">Degree:</label>\n        <input type=\"text\" id=\"degree-").concat(educationCount, "\" placeholder=\"Degree\" required>\n\n        <label for=\"institution-").concat(educationCount, "\">Institution:</label>\n        <input type=\"text\" id=\"institution-").concat(educationCount, "\" placeholder=\"Institution Name\" required>\n\n        <label for=\"year-").concat(educationCount, "\">Year:</label>\n        <input type=\"text\" id=\"year-").concat(educationCount, "\" placeholder=\"Year of Graduation\" required>\n    ");
    container.appendChild(newEducation);
});
// Function to handle form submission and generate the resume
(_c = document.getElementById('resume-form')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var name = document.getElementById('name').value;
    var jobTitle = document.getElementById('job-title').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var skills = document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); });
    var profilePicInput = document.getElementById('profile-pic');
    var profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var _a;
        var profilePicUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
        // Collect work experience data
        var workExperience = [];
        for (var i = 1; i <= workExperienceCount; i++) {
            var jobTitleInput = document.getElementById("job-title-".concat(i));
            var companyInput = document.getElementById("company-".concat(i));
            var durationInput = document.getElementById("duration-".concat(i));
            if (jobTitleInput && companyInput && durationInput) {
                workExperience.push({
                    jobTitle: jobTitleInput.value,
                    company: companyInput.value,
                    duration: durationInput.value
                });
            }
        }
        // Collect education data
        var education = [];
        for (var i = 1; i <= educationCount; i++) {
            var degreeInput = document.getElementById("degree-".concat(i));
            var institutionInput = document.getElementById("institution-".concat(i));
            var yearInput = document.getElementById("year-".concat(i));
            if (degreeInput && institutionInput && yearInput) {
                education.push({
                    degree: degreeInput.value,
                    institution: institutionInput.value,
                    year: yearInput.value
                });
            }
        }
        var resumeData = {
            name: name,
            jobTitle: jobTitle,
            email: email,
            phone: phone,
            skills: skills,
            profilePicUrl: profilePicUrl,
            workExperience: workExperience,
            education: education
        };
        currentResumeData = resumeData;
        generateResume(resumeData);
    };
    if (profilePicFile) {
        reader.readAsDataURL(profilePicFile);
    }
    else {
        if (currentResumeData && currentResumeData.profilePicUrl) {
            var profilePicUrl = currentResumeData.profilePicUrl;
            // Collect work experience and education data as above
            var resumeData = {
                name: name,
                jobTitle: jobTitle,
                email: email,
                phone: phone,
                skills: skills,
                profilePicUrl: profilePicUrl,
                workExperience: currentResumeData.workExperience,
                education: currentResumeData.education
            };
            currentResumeData = resumeData;
            generateResume(resumeData);
        }
        else {
            alert('Please upload a profile picture.');
        }
    }
});
// Function to generate the resume and make it editable
function generateResume(data) {
    currentResumeData = data;
    var resumeSection = document.getElementById('resume');
    // Clear previous content
    resumeSection.innerHTML = '';
    // Generate Work Experience HTML
    var workExperienceHtml = '';
    data.workExperience.forEach(function (exp, index) {
        workExperienceHtml += "\n            <div class=\"work-item\">\n                               <p id=\"job-title-".concat(index + 1, "\" class=\"job-title\" contenteditable=\"true\">").concat(exp.jobTitle, "</p>\n\n                <p id=\"company-").concat(index + 1, "\" class=\"company\" contenteditable=\"true\">at ").concat(exp.company, "</p>\n                <p id=\"duration-").concat(index + 1, "\" class=\"duration\" contenteditable=\"true\">").concat(exp.duration, "</p>\n            </div>\n        ");
    });
    // Generate Education HTML
    var educationHtml = '';
    data.education.forEach(function (edu, index) {
        educationHtml += "\n            <div class=\"education-item\">\n                <p id=\"degree-".concat(index + 1, "\" class=\"degree\" contenteditable=\"true\"><strong>").concat(edu.degree, "</strong></p>\n                <p id=\"institution-").concat(index + 1, "\" class=\"institution\" contenteditable=\"true\">from ").concat(edu.institution, "</p>\n                <p id=\"year-").concat(index + 1, "\" class=\"year\" contenteditable=\"true\">").concat(edu.year, "</p>\n            </div>\n        ");
    });
    // Construct the resume HTML
    resumeSection.innerHTML = "\n        <div class=\"resume-details\">\n            <img src=\"".concat(data.profilePicUrl, "\" alt=\"Profile Picture\" class=\"profile-pic\">\n            <h2 id=\"name-section\">").concat(data.name, "</h2>\n            <h4 id=\"job-title-section\">").concat(data.jobTitle, "</h4>\n            <p id=\"email-section\">Email: ").concat(data.email, "</p>\n            <p id=\"phone-section\">Phone: ").concat(data.phone, "</p>\n\n            <h3>Skills</h3>\n            <p id=\"skills-section\">").concat(data.skills.join(', '), "</p>\n\n            <h3>Work Experience</h3>\n            ").concat(workExperienceHtml, "\n\n            <h3>Education</h3>\n            ").concat(educationHtml, "\n        </div>\n    ");
    // Enable in-place editing
    enableEditing(data);
}
// Function to enable in-place editing for each section
function enableEditing(data) {
    // Personal Information
    ['name-section', 'job-title-section', 'email-section', 'phone-section'].forEach(function (id) {
        var element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', function () {
                makeSectionEditable(id, element.innerText, function (newValue) {
                    switch (id) {
                        case 'name-section':
                            data.name = newValue;
                            break;
                        case 'job-title-section':
                            data.jobTitle = newValue;
                            break;
                        case 'email-section':
                            data.email = newValue;
                            break;
                        case 'phone-section':
                            data.phone = newValue;
                            break;
                    }
                });
            });
        }
    });
    // Skills
    var skillsElement = document.getElementById('skills-section');
    if (skillsElement) {
        skillsElement.addEventListener('click', function () {
            makeSectionEditable('skills-section', data.skills.join(', '), function (newValue) {
                data.skills = newValue.split(',').map(function (skill) { return skill.trim(); });
            });
        });
    }
    // Work Experience
    data.workExperience.forEach(function (exp, index) {
        var idx = index + 1;
        ['job-title', 'company', 'duration'].forEach(function (field) {
            var elementId = "".concat(field, "-").concat(idx);
            var element = document.getElementById(elementId);
            if (element) {
                element.addEventListener('click', function () {
                    makeSectionEditable(elementId, element.innerText, function (newValue) {
                        exp[field] = newValue;
                    });
                });
            }
        });
    });
    // Education
    data.education.forEach(function (edu, index) {
        var idx = index + 1;
        ['degree', 'institution', 'year'].forEach(function (field) {
            var elementId = "".concat(field, "-").concat(idx);
            var element = document.getElementById(elementId);
            if (element) {
                element.addEventListener('click', function () {
                    makeSectionEditable(elementId, element.innerText, function (newValue) {
                        edu[field] = newValue;
                    });
                });
            }
        });
    });
}
// Utility function to make a section editable
function makeSectionEditable(sectionId, initialValue, onSave) {
    var sectionElement = document.getElementById(sectionId);
    if (!sectionElement)
        return;
    var inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = initialValue;
    inputElement.style.width = '100%';
    sectionElement.innerHTML = '';
    sectionElement.appendChild(inputElement);
    inputElement.focus();
    inputElement.addEventListener('blur', function () {
        var newValue = inputElement.value;
        sectionElement.innerText = newValue;
        onSave(newValue);
    });
    inputElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            inputElement.blur();
        }
    });
}
// Function to sanitize the username for URL use (replace spaces, special chars, etc.)
function sanitizeUsername(username) {
    return username.trim().replace(/\s+/g, '-').toLowerCase();
}
// Function to generate the unique URL based on the username
function generateUniqueResumeURL(username) {
    var baseUrl = window.location.origin; // Get the current domain
    var sanitizedUsername = sanitizeUsername(username); // Clean up the username
    return "".concat(baseUrl, "/resume/").concat(sanitizedUsername);
}
// Function to handle sharing of the generated resume link
function shareResumeLink() {
    var resumeLinkInput = document.getElementById('resumeLink');
    var resumeLink = resumeLinkInput.value;
    if (resumeLink) {
        // Copy the link to the clipboard (optional)
        navigator.clipboard.writeText(resumeLink).then(function () {
            alert('Resume link copied to clipboard: ' + resumeLink);
        });
        // Share the link (simple alert for now; you can integrate social media APIs for real sharing)
        alert("Share your resume link: ".concat(resumeLink));
    }
    else {
        alert('Please generate a resume link first!');
    }
}
// Function to download the resume as a basic PDF
function downloadResumeAsPDF() {
    var resumeSection = document.getElementById('resume-section');
    if (resumeSection) {
        var resumeContent = resumeSection.innerHTML;
        // Create a Blob of the resume content
        var blob = new Blob([resumeContent], { type: 'application/pdf' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.pdf';
        // Simulate a click to download the file
        link.click();
        URL.revokeObjectURL(link.href); // Free memory
    }
    else {
        alert('No resume content found!');
    }
}
// Adding event listeners for generating the unique URL, sharing, and downloading resume
function addGenerateUrlListener() {
    var generateLinkButton = document.getElementById('generateLink');
    var resumeLinkInput = document.getElementById('resumeLink');
    var usernameInput = document.getElementById('username');
    var shareButton = document.getElementById('shareresume');
    var downloadButton = document.getElementById('download-resume');
    if (generateLinkButton && resumeLinkInput && usernameInput) {
        generateLinkButton.addEventListener('click', function () {
            var username = usernameInput.value;
            if (username) {
                var generatedUrl = generateUniqueResumeURL(username); // Generate URL using the username
                resumeLinkInput.value = generatedUrl; // Set the generated URL to the input field
            }
            else {
                alert('Please enter a username!');
            }
        });
    }
    if (shareButton) {
        shareButton.addEventListener('click', shareResumeLink); // Attach event listener for sharing
    }
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadResumeAsPDF); // Attach event listener for downloading PDF
    }
}
// Call the function to add the event listeners when the script loads
addGenerateUrlListener();
// Print the resume as PDF
var downloadButton = document.getElementById('download-resume');
downloadButton.addEventListener('click', function () {
    window.print(); // Trigger the print dialog, where the user can save the resume as a PDF
});
// Function to open a new window for social sharing
function openInNewWindow(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}
// Function to share the resume link on social media platforms
function shareResumeOnPlatform(platform) {
    var resumeLinkInput = document.getElementById('resumeLink');
    var resumeLink = resumeLinkInput.value;
    if (!resumeLink) {
        alert('Please generate a resume link first!');
        return;
    }
    var shareUrl = '';
    switch (platform) {
        case 'facebook':
            shareUrl = "https://www.facebook.com/sharer/sharer.php?u=".concat(encodeURIComponent(resumeLink));
            break;
        case 'twitter':
            shareUrl = "https://twitter.com/intent/tweet?url=".concat(encodeURIComponent(resumeLink), "&text=Check+out+my+resume!");
            break;
        case 'linkedin':
            shareUrl = "https://www.linkedin.com/shareArticle?mini=true&url=".concat(encodeURIComponent(resumeLink), "&title=My+Resume");
            break;
        case 'whatsapp':
            shareUrl = "https://wa.me/?text=".concat(encodeURIComponent('Check out my resume: ' + resumeLink));
            break;
        default:
            alert('Unsupported platform!');
            return;
    }
    // Open the sharing URL in a new window
    openInNewWindow(shareUrl);
}
// Adding event listeners for the sharing buttons (you can add buttons for each platform)
function addSocialShareListeners() {
    var facebookButton = document.getElementById('share-facebook');
    var twitterButton = document.getElementById('share-twitter');
    var linkedinButton = document.getElementById('share-linkedin');
    var whatsappButton = document.getElementById('share-whatsapp');
    if (facebookButton) {
        facebookButton.addEventListener('click', function () { return shareResumeOnPlatform('facebook'); });
    }
    if (twitterButton) {
        twitterButton.addEventListener('click', function () { return shareResumeOnPlatform('twitter'); });
    }
    if (linkedinButton) {
        linkedinButton.addEventListener('click', function () { return shareResumeOnPlatform('linkedin'); });
    }
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function () { return shareResumeOnPlatform('whatsapp'); });
    }
}
// Call the function to add the social share event listeners when the script loads
addSocialShareListeners();
