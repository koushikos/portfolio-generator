// Portfolio Generator - JavaScript
// This script handles the dynamic portfolio generation based on user input

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('portfolioForm');
    const nameInput = document.getElementById('name');
    const titleInput = document.getElementById('title');
    const bioInput = document.getElementById('bio');
    const skillsInput = document.getElementById('skills');
    const emailInput = document.getElementById('email');
    const githubInput = document.getElementById('github');
    const linkedinInput = document.getElementById('linkedin');
    const addProjectBtn = document.getElementById('addProjectBtn');
    const projectsContainer = document.getElementById('projectsContainer');

    // Get preview elements
    const previewName = document.getElementById('previewName');
    const previewTitle = document.getElementById('previewTitle');
    const previewBio = document.getElementById('previewBio');
    const previewSkills = document.getElementById('previewSkills');
    const previewProjects = document.getElementById('previewProjects');
    const previewEmail = document.getElementById('previewEmail');
    const previewGithub = document.getElementById('previewGithub');
    const previewLinkedin = document.getElementById('previewLinkedin');

    // Add event listeners to all input fields for real-time updates
    const inputs = [nameInput, titleInput, bioInput, skillsInput, emailInput, githubInput, linkedinInput];
    
    inputs.forEach(input => {
        input.addEventListener('input', updatePortfolio);
    });

    // Add project button functionality
    addProjectBtn.addEventListener('click', function() {
        addProjectField();
    });

    // Add input listeners to existing project fields
    const projectInputs = projectsContainer.querySelectorAll('input, textarea');
    projectInputs.forEach(input => {
        input.addEventListener('input', updateProjects);
    });

    // Function to update the portfolio preview
    function updatePortfolio() {
        // Update name
        previewName.textContent = nameInput.value || 'Your Name';
        
        // Update title
        previewTitle.textContent = titleInput.value || 'Your Professional Title';
        
        // Update bio
        previewBio.textContent = bioInput.value || 'Your bio will appear here...';
        
        // Update skills
        updateSkills();
        
        // Update contact links
        updateContactLinks();
    }

    // Function to update skills
    function updateSkills() {
        const skills = skillsInput.value.split(',').map(skill => skill.trim()).filter(skill => skill);
        
        if (skills.length > 0 && skills[0] !== '') {
            previewSkills.innerHTML = skills.map(skill => 
                `<span class="skill-tag">${escapeHtml(skill)}</span>`
            ).join('');
        } else {
            previewSkills.innerHTML = '<span class="skill-tag">Your Skills</span>';
        }
    }

    // Function to update contact links
    function updateContactLinks() {
        // Email
        if (emailInput.value) {
            previewEmail.href = `mailto:${emailInput.value}`;
            previewEmail.style.display = 'inline-flex';
        } else {
            previewEmail.href = '#';
            previewEmail.style.display = 'none';
        }

        // GitHub
        if (githubInput.value) {
            previewGithub.href = githubInput.value;
            previewGithub.style.display = 'inline-flex';
        } else {
            previewGithub.href = '#';
            previewGithub.style.display = 'none';
        }

        // LinkedIn
        if (linkedinInput.value) {
            previewLinkedin.href = linkedinInput.value;
            previewLinkedin.style.display = 'inline-flex';
        } else {
            previewLinkedin.href = '#';
            previewLinkedin.style.display = 'none';
        }
    }

    // Function to add a new project field
    function addProjectField() {
        const projectEntry = document.createElement('div');
        projectEntry.className = 'project-entry';
        projectEntry.innerHTML = `
            <input type="text" class="project-name" placeholder="Project Title">
            <textarea class="project-description" rows="2" placeholder="Project Description"></textarea>
            <input type="url" class="project-link" placeholder="Project URL (optional)">
        `;

        projectsContainer.appendChild(projectEntry);

        // Add event listeners to new inputs
        const newInputs = projectEntry.querySelectorAll('input, textarea');
        newInputs.forEach(input => {
            input.addEventListener('input', updateProjects);
        });

        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'btn-remove';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function() {
            projectEntry.remove();
            updateProjects();
        });
        projectEntry.appendChild(removeBtn);
    }

    // Function to update projects in preview
    function updateProjects() {
        const projectEntries = projectsContainer.querySelectorAll('.project-entry');
        const projects = [];

        projectEntries.forEach(entry => {
            const name = entry.querySelector('.project-name').value;
            const description = entry.querySelector('.project-description').value;
            const link = entry.querySelector('.project-link').value;

            if (name) {
                projects.push({ name, description, link });
            }
        });

        if (projects.length > 0) {
            previewProjects.innerHTML = projects.map(project => `
                <div class="project-card">
                    <h3>${escapeHtml(project.name)}</h3>
                    <p>${escapeHtml(project.description) || 'No description provided'}</p>
                    ${project.link ? `<a href="${escapeHtml(project.link)}" target="_blank">View Project →</a>` : ''}
                </div>
            `).join('');
        } else {
            previewProjects.innerHTML = '<p class="no-content">No projects added yet</p>';
        }
    }

    // Utility function to escape HTML and prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initial update
    updatePortfolio();
    updateProjects();
});

