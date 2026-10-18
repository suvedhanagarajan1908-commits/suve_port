/**
 * Suvedha Portfolio - Standalone JavaScript
 * Handles navigation, filter tabs, project modal, resume action, and contact validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (mobileMenu.classList.contains('open')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 2. Skills Category Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Project Details Data & Modal Logic
  const projectsData = {
    'my-study-ai': {
      title: 'My Study AI',
      subtitle: 'Conversational Study Assistant Application',
      category: 'AI & Web Development',
      desc: 'An AI-powered chatbot application inspired by conversational AI tools such as ChatGPT, designed to help students interact with an AI assistant and get real-time learning support.',
      bullets: [
        'Designed an intuitive chatbox-style interface for interactive question-and-answer conversations.',
        'Focused on providing a user-friendly platform for students to ask questions and receive study assistance.',
        'Engineered responsive query parsing and interactive conversational workflows.'
      ],
      tech: ['Python', 'HTML5', 'CSS3', 'JavaScript', 'Conversational AI'],
      github: 'https://github.com/suvedhan'
    },
    'fleet-expense-system': {
      title: 'Fleet Management Expert System with Expense Monitoring',
      subtitle: 'Vehicle Cost Analytics & Anomaly Detection',
      category: 'Python & Backend Logic',
      desc: 'A Python-based system that tracks vehicle expenses, calculates cost per kilometre, identifies unusual expenses, and provides expense recommendations.',
      bullets: [
        'Tracks fuel, routine maintenance, tolls, and operating overheads with granular categorizations.',
        'Computes real-time cost-per-kilometre metrics to identify operational inefficiencies.',
        'Detects spending outliers using statistical thresholds and issues actionable cost-cutting recommendations.'
      ],
      tech: ['Python', 'Rule-Based System', 'Data Analysis', 'Expense Algorithms'],
      github: 'https://github.com/suvedhan'
    },
    'gem-bid-compliance': {
      title: 'GeM Bid Compliance Verification',
      subtitle: 'Automated Government Procurement Audit System',
      category: 'Academic Innovation & ML',
      desc: 'An academic innovation project focused on automating the verification of government procurement bid documents, certificates, expiry dates, and compliance requirements using intelligent verification methods.',
      bullets: [
        'Automates parsing and validation of complex government tender bids and supplier credentials.',
        'Verifies compliance checklists, expiration timelines, and statutory validity dates.',
        'Minimizes manual review overhead and reduces clerical oversights in procurement decisions.'
      ],
      tech: ['Python', 'Machine Learning', 'Data Analysis', 'Document Verification'],
      github: 'https://github.com/suvedhan'
    },
    'aqi-monitor': {
      title: 'AQI & Air Quality Index Monitor',
      subtitle: 'Real-time Environmental Health Dashboard',
      desc: 'Application that tracks and displays Air Quality Index (AQI) to help users monitor environmental pollution levels and assess outdoor air safety.',
      bullets: [
        'Created a simple interface for viewing and understanding air-quality information.',
        'Structured real-time pollutant metrics with intuitive color-coded safety thresholds.'
      ],
      tech: ['Python', 'HTML', 'CSS', 'Data Visualization'],
      github: 'https://github.com/suvedhan'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalCloseActionBtn = document.getElementById('modalCloseActionBtn');
  const openProjButtons = document.querySelectorAll('.open-proj-details');

  const openModal = (projId) => {
    const data = projectsData[projId];
    if (!data || !projectModal) return;

    document.getElementById('modalCategory').innerText = data.category;
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalSubtitle').innerText = data.subtitle;
    document.getElementById('modalDesc').innerText = data.desc;

    // Bullets
    const bulletsList = document.getElementById('modalBullets');
    bulletsList.innerHTML = '';
    data.bullets.forEach(b => {
      const li = document.createElement('li');
      li.innerText = b;
      bulletsList.appendChild(li);
    });

    // Tech tags
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.innerText = t;
      techContainer.appendChild(span);
    });

    // GitHub link
    const githubBtn = document.getElementById('modalGithubBtn');
    if (githubBtn) githubBtn.href = data.github;

    projectModal.classList.add('active');
  };

  const closeModal = () => {
    if (projectModal) projectModal.classList.remove('active');
  };

  openProjButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projId = e.currentTarget.getAttribute('data-proj');
      openModal(projId);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalCloseActionBtn) modalCloseActionBtn.addEventListener('click', closeModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  // 4. Resume Print / Download Action
  const downloadResumeBtn = document.getElementById('downloadResumeBtn');
  const openResumeModalBtn = document.getElementById('openResumeModalBtn');

  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (openResumeModalBtn) {
    openResumeModalBtn.addEventListener('click', () => {
      const resumeSection = document.getElementById('resume');
      if (resumeSection) {
        resumeSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 5. 1-Click Email Copy
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'suvedhanagarajan1908@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyEmailBtn.style.color = '#10b981';
        setTimeout(() => {
          copyEmailBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy Email';
          copyEmailBtn.style.color = '';
        }, 2000);
      });
    });
  }

  // 6. Contact Form Validation & Mailto Action
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim() || `Portfolio Inquiry from ${name}`;
      const message = document.getElementById('message').value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !emailPattern.test(email) || !message) {
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        formStatus.innerText = 'Please fill out all required fields with a valid email address.';
        return;
      }

      formStatus.className = 'form-status success';
      formStatus.style.display = 'block';
      formStatus.innerText = 'Opening your email client to send your message directly to Suvedha...';

      const mailtoUrl = `mailto:suvedhanagarajan1908@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
      
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);
    });
  }

  // 7. Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});