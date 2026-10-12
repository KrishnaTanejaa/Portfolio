/**
 * KRISHNA TANEJA — PORTFOLIO JAVASCRIPT
 * Simple, clean interaction logic for navigation, project details modals,
 * clipboard copying, and back-to-top button.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpy();
  initCaseStudyModals();
  initClipboardActions();
  initBackToTop();
});

// ----------------------------------------------------
// 1. MOBILE NAVIGATION MENU
// ----------------------------------------------------
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-drawer a');

  if (!toggleBtn || !drawer) return;

  function toggleDrawer(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const firstLink = drawer.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggleBtn.focus();
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDrawer();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleDrawer(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleDrawer(false);
    }
  });

  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleDrawer(false);
    }
  });
}

// ----------------------------------------------------
// 2. ACTIVE NAVIGATION LINK TRACKING
// ----------------------------------------------------
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-item a, .mobile-nav-list a');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// ----------------------------------------------------
// 3. PROJECT DETAILS DATA & MODAL WINDOW
// ----------------------------------------------------
const projectCaseStudies = {
  'lab-management': {
    order: 'Project 01',
    title: 'Lab Management System',
    statusBadge: 'status-deploying',
    statusText: 'Being deployed in the college lab',
    overview: 'A web application built to help our college computer and electronics laboratory track student attendance, assign lab computers, and manage equipment checkout.',
    problem: 'In our college lab, student attendance and equipment were tracked manually in paper registers. Components like microcontrollers and multimeter probes would sometimes get misplaced, and it was hard to know which computer stations were broken.',
    functionality: [
      'Student Check-In: Records student attendance and assigns them to specific computer desks.',
      'Equipment Tracking: Keeps a digital log of who borrowed sensors, development boards, and testing tools.',
      'User Roles: Separate permissions for lab assistants, subject teachers, and administrators.',
      'Report Broken Hardware: Students or staff can flag broken computers or equipment so they get repaired.',
      'Summary Reports: Generates simple usage reports for our department.'
    ],
    evolution: {
      earlier: 'I first created a simple desktop script and basic spreadsheet-style table to keep an inventory list on a single computer.',
      present: 'I upgraded it into a full web application with user logins, role permissions, a shared database, and network setup so it can run across our college lab network.'
    },
    techStack: ['Python', 'SQL Database', 'REST APIs', 'User Authentication', 'HTML / SCSS / JS', 'College Lab Network'],
    contribution: 'I designed the database, built the backend logic and user permissions, created the web interface, and am currently helping deploy it on our college lab network.'
  },
  'megatron': {
    order: 'Project 02',
    title: 'Megatron',
    statusBadge: 'status-prep',
    statusText: 'Being prepared for college deployment',
    overview: 'An automation tool built to run background tasks and monitor computer systems in our college labs.',
    problem: 'Managing multiple computers in a college lab involves repetitive work like running routine maintenance tasks, checking if services are running, and diagnosing errors.',
    functionality: [
      'Task Automation: Runs scheduled scripts and tasks in the background without needing manual clicks.',
      'System Monitor: Checks if lab computers and background processes are running normally.',
      'Safe Commands: Includes a simple control interface with safety checks so tasks do not stop unexpectedly.',
      'Activity Logs: Saves error messages and activity logs to make troubleshooting easy.'
    ],
    technicalApproach: 'Built in Python using asynchronous code so multiple background tasks can run smoothly without freezing the system.',
    techStack: ['Python', 'Automation Scripts', 'Async Tasks', 'System Monitoring', 'Error Logging'],
    contribution: 'I built the task scheduler, wrote the background monitoring script, and tested how the tool handles errors.'
  },
  'timetable-scheduler': {
    order: 'Project 03',
    title: 'Timetable Scheduler Using DFS',
    statusBadge: 'status-planned',
    statusText: 'Academic project with college deployment being planned',
    overview: 'My AI/ML subject project that uses Depth-First Search (DFS) with backtracking to generate clash-free college class timetables.',
    problem: 'Creating college timetables by hand takes days because of scheduling conflicts: a teacher cannot teach two classes at the same time, classrooms have limited seats, and practical labs need continuous hours.',
    functionality: [
      'Constraint Checking: Makes sure teachers, student batches, and rooms never have schedule clashes.',
      'Depth-First Search: Assigns classes to time slots one step at a time along a search tree.',
      'Backtracking: When the algorithm hits an impossible slot (a clash), it steps back to the previous decision and tries a different slot.',
      'Room Size Check: Ensures student batches are only placed in rooms with enough seats.',
      'Lab Block Support: Groups practical lab sessions into continuous 2-hour or 3-hour blocks.'
    ],
    algorithmDetails: 'The scheduler models timetable slots as a search tree. It explores one possible schedule branch using DFS. If any conflict happens, it backtracks and tries another branch until it finds a valid timetable.',
    techStack: ['Python', 'AI/ML Subject Project', 'Depth-First Search (DFS)', 'Backtracking', 'Constraint Solving'],
    contribution: 'I wrote the timetable constraint rules, implemented the recursive DFS algorithm with backtracking in Python, and tested it on sample college batch schedules.'
  },
  'spie-web-systems': {
    order: 'Project 04',
    title: 'SPIE / Web Systems',
    statusBadge: 'status-systems',
    statusText: 'Web Systems Project',
    overview: 'A web project focused on building clean web pages with reliable backend communication and organized styling.',
    problem: 'Web apps often run into bugs when the frontend and backend are tightly coupled or when user inputs are not properly checked before saving.',
    functionality: [
      'Organized structure separating frontend display from backend services.',
      'Responsive design that works cleanly on both phones and laptops.',
      'Form validation and clear error messages when something goes wrong.',
      'Reliable data saving and loading.'
    ],
    techStack: ['JavaScript', 'HTML5', 'SCSS / CSS3', 'Backend APIs', 'Web Systems'],
    contribution: 'I developed the frontend layout, connected it to backend endpoints, and wrote clean Sass styles for the user interface.'
  },
  'hardware-engineering': {
    order: 'Project 05',
    title: 'Hardware Engineering Projects',
    statusBadge: 'status-hardware',
    statusText: 'Hardware & Embedded Systems',
    overview: 'Hands-on electronic and embedded projects where I write code for microcontrollers and connect physical sensors and components.',
    problem: 'Connecting software to physical hardware requires reading electrical signals accurately, avoiding signal noise, and communicating over serial wires.',
    functionality: [
      'Microcontroller programming using C and C++.',
      'Serial communication between components using UART, I2C, and SPI protocols.',
      'Reading sensor data (like temperature, distance, or motion) with signal filtering.',
      'Wiring and testing circuits on breadboards with power supplies.',
      'Testing signals and debugging hardware using digital multimeters and oscilloscopes.'
    ],
    techStack: ['Embedded C / C++', 'Microcontrollers (Arduino, ESP)', 'UART, I2C, SPI', 'Breadboard Prototyping', 'Testing Tools'],
    contribution: 'I wrote microcontroller code, assembled and wired circuits on breadboards, calibrated sensor readings, and debugged hardware connections.'
  },
  'flowops': {
    order: 'Project 06',
    title: 'FlowOps',
    statusBadge: 'status-dev',
    statusText: 'In development',
    overview: 'An ongoing project to build a step-by-step task runner that automates everyday technical workflows.',
    problem: 'Running multi-step tasks manually is tedious and easy to make mistakes on when steps depend on each other.',
    functionality: [
      'WHAT IS COMPLETED: The core runner that executes tasks step-by-step in order.',
      'WHAT IS COMPLETED: Task configuration reader and basic error logging.',
      'WHAT REMAINS TO BE BUILT: Support for running tasks across multiple computers.',
      'WHAT REMAINS TO BE BUILT: A simple web dashboard to see real-time task progress.',
      'WHAT REMAINS TO BE BUILT: Automatic retries when a step fails.'
    ],
    techStack: ['Python', 'Task Runner', 'In Active Development', 'Workflow Automation'],
    contribution: 'I built the core step-by-step task executor and am currently working on adding error retry logic.'
  }
};

function initCaseStudyModals() {
  const modalBackdrop = document.querySelector('.case-modal-backdrop');
  if (!modalBackdrop) return;

  const closeBtn = modalBackdrop.querySelector('.btn-close-modal');
  const footerCloseBtn = modalBackdrop.querySelector('.btn-modal-close-footer');
  const modalEyebrow = modalBackdrop.querySelector('.modal-eyebrow');
  const modalTitle = modalBackdrop.querySelector('.modal-title');
  const modalStatus = modalBackdrop.querySelector('.modal-status-container');
  const modalBody = modalBackdrop.querySelector('.case-modal-body');

  let activeTrigger = null;

  function openModal(projectId, triggerBtn) {
    const data = projectCaseStudies[projectId];
    if (!data) return;

    activeTrigger = triggerBtn;

    modalEyebrow.textContent = data.order;
    modalTitle.textContent = data.title;

    modalStatus.innerHTML = `
      <span class="status-pill ${data.statusBadge}">
        <span class="status-dot"></span>
        ${data.statusText}
      </span>
    `;

    let html = `
      <div class="modal-section">
        <h4><i class="fas fa-bullseye"></i> Overview</h4>
        <p>${data.overview}</p>
      </div>
      <div class="modal-section">
        <h4><i class="fas fa-question-circle"></i> What Problem Does It Solve?</h4>
        <p>${data.problem}</p>
      </div>
      <div class="modal-section">
        <h4><i class="fas fa-cogs"></i> What It Does</h4>
        <ul>
          ${data.functionality.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;

    if (data.evolution) {
      html += `
        <div class="modal-section">
          <h4><i class="fas fa-history"></i> Project Evolution</h4>
          <p><strong>Earlier Version:</strong> ${data.evolution.earlier}</p>
          <p style="margin-top:0.4rem;"><strong>Present Version:</strong> ${data.evolution.present}</p>
        </div>
      `;
    }

    if (data.algorithmDetails) {
      html += `
        <div class="modal-section">
          <h4><i class="fas fa-project-diagram"></i> How the Algorithm Works</h4>
          <p>${data.algorithmDetails}</p>
        </div>
      `;
    }

    if (data.technicalApproach) {
      html += `
        <div class="modal-section">
          <h4><i class="fas fa-microchip"></i> How It Works</h4>
          <p>${data.technicalApproach}</p>
        </div>
      `;
    }

    html += `
      <div class="modal-section">
        <h4><i class="fas fa-layer-group"></i> Technologies Used</h4>
        <div class="tech-tag-group">
          ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="modal-section">
        <h4><i class="fas fa-user-check"></i> What I Worked On</h4>
        <p>${data.contribution}</p>
      </div>
    `;

    modalBody.innerHTML = html;
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (activeTrigger) {
      activeTrigger.focus();
    }
  }

  document.querySelectorAll('[data-project-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-modal');
      openModal(projectId, btn);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

// ----------------------------------------------------
// 4. CLIPBOARD COPY & TOAST NOTIFICATION
// ----------------------------------------------------
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-copy-text]');
  const toast = document.querySelector('.toast-notice');

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy-text');
      try {
        await navigator.clipboard.writeText(text);
        showToast(`Copied ${text} to clipboard`);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied ${text} to clipboard`);
      }
    });
  });
}

// ----------------------------------------------------
// 5. BACK TO TOP BUTTON
// ----------------------------------------------------
function initBackToTop() {
  const btnTop = document.querySelector('.btn-scroll-top');
  if (!btnTop) return;

  btnTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}