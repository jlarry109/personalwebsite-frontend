export async function generateResumePDF(personalInfo, experience, education, skills, projects) {
  console.log('PDF Export - Data received:', { personalInfo, experience, education, skills, projects });
  
  // Check if data is available
  if (!personalInfo || !personalInfo.firstName) {
    alert('Personal information not loaded. Please wait for the page to fully load and try again.');
    return;
  }
  
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Pop-up blocked. Please allow pop-ups for this site and try again.');
    return;
  }
  
  const resumeHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Resume - ${personalInfo.firstName} ${personalInfo.lastName}</title>
      <style>
        @page { size: letter; margin: 0.5in; }
        body { font-family: Arial, sans-serif; margin: 0; line-height: 1.3; font-size: 11px; }
        .header { text-align: center; margin-bottom: 15px; }
        .header h1 { font-size: 18px; margin: 0 0 5px 0; }
        .header p { margin: 2px 0; font-size: 10px; }
        .section { margin-bottom: 12px; }
        .section h2 { color: #333; border-bottom: 1px solid #6366f1; padding-bottom: 2px; font-size: 14px; margin: 0 0 8px 0; }
        .experience-item, .education-item, .project-item { margin-bottom: 8px; }
        .experience-item h3, .education-item h3, .project-item h3 { font-size: 12px; margin: 0 0 2px 0; }
        .experience-item p, .education-item p, .project-item p { margin: 0 0 4px 0; font-size: 10px; }
        .skills { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; }
        .skill { background: #6366f1; color: white; padding: 3px 6px; border-radius: 10px; font-size: 9px; text-align: center; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${personalInfo.firstName} ${personalInfo.lastName}</h1>
        <p>${personalInfo.email} | ${personalInfo.phone}</p>
        <p>${personalInfo.address}</p>
      </div>
      
      <div class="section">
        <h2>Professional Summary</h2>
        <p>${personalInfo.bio}</p>
      </div>
      
      <div class="section">
        <h2>Education</h2>
        ${education.sort((a, b) => b.startYear - a.startYear).map(edu => `
          <div class="education-item">
            <h3>${edu.degree}</h3>
            <p>${edu.schoolName} - ${edu.startYear} to ${edu.endYear}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="section">
        <h2>Experience</h2>
        ${experience.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)).map(exp => `
          <div class="experience-item">
            <h3>${exp.position} - ${exp.companyName}</h3>
            <p><em>${new Date(exp.startDate).getFullYear()} - ${exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}</em></p>
            <p>${exp.description}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="section">
        <h2>Projects</h2>
        ${projects.slice(0, 2).map(project => `
          <div class="project-item">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="section">
        <h2>Skills</h2>
        <div class="skills">
          ${skills.map(skill => `<span class="skill">${skill.skillName}</span>`).join('')}
        </div>
      </div>
    </body>
    </html>
  `;
  
  printWindow.document.write(resumeHTML);
  printWindow.document.close();
  
  setTimeout(() => {
    printWindow.print();
  }, 500);
}