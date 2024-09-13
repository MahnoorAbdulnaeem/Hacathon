document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const resumeOutputElement = document.getElementById('resumeOutput');

    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && resumeOutputElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

        const resumeHTML = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture" style="width:150px;height:150px;border-radius:50%;">` : ""}
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
        `;

        resumeOutputElement.innerHTML = resumeHTML;
        resumeOutputElement.classList.remove("hidden");

        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head><title>Resume</title></head>
                        <body>${resumeHTML}</body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
            }
        });
        buttonsContainer.appendChild(downloadButton);

        
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Shareable Link";
        shareLinkButton.addEventListener("click", async () => {
            try {
                const blob = new Blob([resumeHTML], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                
                await navigator.clipboard.writeText(url);
                alert("Shareable Link copied to clipboard: " + url);
            } catch (err) {
                console.error("Failed to copy Link: ", err);
                alert("Failed to copy Link to clipboard. Please try again.");
            }
        });
        buttonsContainer.appendChild(shareLinkButton);

    } else {
        console.error("Form elements are missing");
    }
});
