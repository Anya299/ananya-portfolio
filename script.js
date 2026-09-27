/* =========================================================
   ANANYA SHEKHAR — PORTFOLIO SCRIPT
   Vanilla JS. No frameworks. Organized into small modules.
   ========================================================= */

(function () {

  'use strict';

  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* =====================================================
     CONFIG: PERSONAL LINKS
     ===================================================== */

  var LINKS = {

    github: 'https://github.com/Anya299',

    linkedin: 'https://www.linkedin.com/in/ananya-s299/',

    youtube: '',

    email: 'ananyashekhar76@gmail.com'

  };


  function applyLink(el, url, fallbackLabel) {

    if (!el) return;

    if (url) {

      el.setAttribute('href', url);

    } else {

      el.setAttribute('href', '#');

      el.setAttribute('aria-disabled', 'true');

      el.title = fallbackLabel + ' link not yet added';

      el.addEventListener('click', function (e) {

        e.preventDefault();

      });

    }

  }


  document.addEventListener('DOMContentLoaded', function () {

    applyLink(
      document.getElementById('linkedin-link-desktop'),
      LINKS.linkedin,
      'LinkedIn'
    );

    applyLink(
      document.getElementById('linkedin-link-mobile'),
      LINKS.linkedin,
      'LinkedIn'
    );

    applyLink(
      document.getElementById('linkedin-link-hero'),
      LINKS.linkedin,
      'LinkedIn'
    );

    applyLink(
      document.getElementById('linkedin-link-contact'),
      LINKS.linkedin,
      'LinkedIn'
    );

    applyLink(
      document.getElementById('linkedin-link-footer'),
      LINKS.linkedin,
      'LinkedIn'
    );

    applyLink(
      document.getElementById('youtube-link-footer'),
      LINKS.youtube,
      'YouTube'
    );


    var emailLink = document.getElementById('email-link');

    if (emailLink) {

      if (LINKS.email) {

        emailLink.href = 'mailto:' + LINKS.email;

      } else {

        emailLink.href = '#';

        emailLink.addEventListener('click', function (e) {

          e.preventDefault();

        });

      }

    }

  });


  /* =====================================================
     LOADER
     ===================================================== */

  window.addEventListener('load', function () {

    var loader = document.getElementById('loader');

    var minDelay = prefersReducedMotion ? 200 : 700;

    setTimeout(function () {

      if (loader) {
        loader.classList.add('hidden');
      }

    }, minDelay);

  });


  /* =====================================================
     SCROLL PROGRESS
     ===================================================== */

  var progressBar = document.getElementById('scroll-progress');


  function updateScrollProgress() {

    var scrollTop = window.scrollY;

    var docHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    var pct =
      docHeight > 0
        ? (scrollTop / docHeight) * 100
        : 0;

    if (progressBar) {

      progressBar.style.width = pct + '%';

    }

  }


  /* =====================================================
     HEADER SCROLLED STATE + ACTIVE NAV
     ===================================================== */

  var header =
    document.getElementById('site-header');

  var sections =
    Array.prototype.slice.call(
      document.querySelectorAll('main section[id]')
    );

  var navLinks =
    Array.prototype.slice.call(
      document.querySelectorAll('.nav-links a')
    );

  var backToTop =
    document.getElementById('back-to-top');


  function onScroll() {

    updateScrollProgress();


    if (header) {

      if (window.scrollY > 40) {

        header.classList.add('scrolled');

      } else {

        header.classList.remove('scrolled');

      }

    }


    if (backToTop) {

      if (window.scrollY > 700) {

        backToTop.classList.add('visible');

      } else {

        backToTop.classList.remove('visible');

      }

    }


    var scrollPos =
      window.scrollY + 140;

    var currentId = null;


    sections.forEach(function (sec) {

      if (scrollPos >= sec.offsetTop) {

        currentId = sec.id;

      }

    });


    navLinks.forEach(function (link) {

      var match =
        link.getAttribute('href') === '#' + currentId;

      link.classList.toggle('active', match);

    });

  }


  window.addEventListener(
    'scroll',
    onScroll,
    { passive: true }
  );

  onScroll();


  if (backToTop) {

    backToTop.addEventListener('click', function () {

      window.scrollTo({

        top: 0,

        behavior:
          prefersReducedMotion
            ? 'auto'
            : 'smooth'

      });

    });

  }


  /* =====================================================
     MOBILE MENU
     ===================================================== */

  var navToggle =
    document.getElementById('nav-toggle');

  var mobileMenu =
    document.getElementById('mobile-menu');


  if (navToggle && mobileMenu) {

    navToggle.addEventListener('click', function () {

      var isOpen =
        mobileMenu.classList.toggle('open');

      navToggle.classList.toggle(
        'open',
        isOpen
      );

      navToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

      document.body.style.overflow =
        isOpen ? 'hidden' : '';

    });


    mobileMenu
      .querySelectorAll('a')
      .forEach(function (link) {

        link.addEventListener('click', function () {

          mobileMenu.classList.remove('open');

          navToggle.classList.remove('open');

          navToggle.setAttribute(
            'aria-expanded',
            'false'
          );

          document.body.style.overflow = '';

        });

      });

  }


  /* =====================================================
     CUSTOM CURSOR — DESKTOP ONLY
     ===================================================== */

  var isTouch =
    window.matchMedia(
      '(hover: none), (pointer: coarse)'
    ).matches;


  if (!isTouch) {

    var dot =
      document.querySelector('.cursor-dot');

    var ring =
      document.querySelector('.cursor-ring');


    var mouseX = -100;

    var mouseY = -100;

    var ringX = -100;

    var ringY = -100;


    window.addEventListener('mousemove', function (e) {

      mouseX = e.clientX;

      mouseY = e.clientY;


      if (dot) {

        dot.style.left =
          mouseX + 'px';

        dot.style.top =
          mouseY + 'px';

      }

    });


    function animateRing() {

      ringX +=
        (mouseX - ringX) * 0.18;

      ringY +=
        (mouseY - ringY) * 0.18;


      if (ring) {

        ring.style.left =
          ringX + 'px';

        ring.style.top =
          ringY + 'px';

      }


      requestAnimationFrame(animateRing);

    }


    animateRing();


    var hoverTargets =
      'a, button, .project-card, input, textarea';


    document.addEventListener(
      'mouseover',
      function (e) {

        if (
          e.target.closest &&
          e.target.closest(hoverTargets)
        ) {

          if (ring) {
            ring.classList.add('hovering');
          }

        }

      }
    );


    document.addEventListener(
      'mouseout',
      function (e) {

        if (
          e.target.closest &&
          e.target.closest(hoverTargets)
        ) {

          if (ring) {
            ring.classList.remove('hovering');
          }

        }

      }
    );

  }


  /* =====================================================
     SCROLL REVEAL
     ===================================================== */

  var revealEls =
    document.querySelectorAll('.reveal');


  if ('IntersectionObserver' in window) {

    var io =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add('in');

              io.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.15
        }
      );


    revealEls.forEach(function (el) {

      io.observe(el);

    });

  } else {

    revealEls.forEach(function (el) {

      el.classList.add('in');

    });

  }


  /* =====================================================
     GSAP HERO ENTRANCE
     ===================================================== */

  if (
    window.gsap &&
    !prefersReducedMotion
  ) {

    gsap.set(
      '.hero-copy .eyebrow, .hero-copy h1, .hero-copy .tagline, .hero-actions, .hero-secondary-links',
      {
        opacity: 0,
        y: 22
      }
    );


    gsap.timeline({
      delay: 0.5
    })

      .to(
        '.hero-copy .eyebrow',
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out'
        }
      )

      .to(
        '.hero-copy h1',
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out'
        },
        '-=0.45'
      )

      .to(
        '.hero-copy .tagline',
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out'
        },
        '-=0.55'
      )

      .to(
        '.hero-actions',
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out'
        },
        '-=0.5'
      )

      .to(
        '.hero-secondary-links',
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out'
        },
        '-=0.5'
      );

  }


  /* =====================================================
     PROJECT DATA + RENDERING
     ===================================================== */

  var PROJECTS = [

    {
      num: '01',

      slug: 'ai-bug-investigator',

      name: 'AI Bug Investigator',

      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',

      description:
        'An AI-powered developer tool designed to analyze programming bugs and provide useful debugging insights.',

      problem:
        'Developers can spend significant time identifying the cause of programming errors and understanding unfamiliar stack traces.',

      solution:
        'Built an AI-assisted debugging interface that accepts programming errors and provides structured analysis, possible causes, and debugging guidance.',

      learned:
        'Strengthened practical skills in API integration, backend development, debugging workflows, and building AI-assisted developer tools.',

      tags: [
        'AI',
        'Python',
        'FastAPI',
        'JavaScript',
        'Supabase',
        'AI APIs'
      ],

      github:
        'https://github.com/Anya299/AI-Bug-Investigator',

      live:
        'https://trace-dev-ai.vercel.app/',

      fallbackClass:
        'fallback-ai'
    },


    {
      num: '02',

      slug: 'life-random-generator',

      name: 'Life Random Generator',

      image:
        'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&q=85',

      description:
        'An experimental AI-powered web application that generates creative suggestions and experiences.',

      problem:
        'Users often want spontaneous ideas for activities, experiences, and creative decisions without manually searching through large lists.',

      solution:
        'Created an interactive AI-powered experience that generates suggestions dynamically through a lightweight web interface.',

      learned:
        'Practiced API integration, Node.js application structure, frontend interaction design, and connecting AI services to web experiences.',

      tags: [
        'AI',
        'Node.js',
        'Express',
        'JavaScript',
        'Hugging Face'
      ],

      github:
        'https://github.com/Anya299/Life_Random_Life_Generator',

      live: '',

      fallbackClass:
        'fallback-ai'
    },

    {
      num: '03',
      slug: 'vapi-voice-agent',
      name: 'Vapi Voice Agent',
      image:
        'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=85',
      description:
         'An AI-powered healthcare voice assistant that connects conversational voice interactions with real appointment management workflows.',
      problem:
         'Patients often need a simple way to schedule or manage appointments without navigating complex healthcare interfaces.',
      solution:
         'Built a voice-driven appointment system using Vapi, FastAPI, SQLAlchemy, and Streamlit, enabling conversational appointment booking, cancellation, availability viewing, and database-backed scheduling with validation for duplicate and past time slots.',
      learned:
         'Strengthened skills in voice AI integration, API design, backend development, database persistence, tool calling, validation, and building AI systems that connect natural-language interactions with real application workflows.',
      tags: [
         'Vapi',
         'Voice AI',
         'Python',
         'FastAPI',
         'SQLAlchemy',
         'Streamlit',
         'Healthcare'
       ],
      github:
        '',
      live:
        '',
      fallbackClass:
         'fallback-ai'
      },

    /* =================================================
       PROJECT 06 — AVENUE MEDICAL
       ================================================= */

    {
      num: '03',

      slug: 'avenue-medical',

      name: 'Avenue Medical',

      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=85',

      description:
        'A premium healthcare website concept focused on clarity, trust, coordinated care, and a refined patient experience across desktop and mobile.',

      problem:
        'Healthcare websites can become difficult to navigate when important information, specialties, doctors, and appointment pathways are presented without a clear structure.',

      solution:
        'Designed a calm, editorial-style healthcare experience with clear navigation, specialty discovery, patient journey storytelling, physician profiles, responsive layouts, subtle motion, and an interactive appointment interface.',

      learned:
        'Strengthened skills in responsive interface design, interaction design, animation, accessibility considerations, visual hierarchy, and deploying a production-ready static website.',

      tags: [
        'HTML',
        'CSS',
        'JavaScript',
        'Responsive UI',
        'UX',
        'Healthcare'
      ],

      github:
        'https://github.com/Anya299/avenue-medical',

      live:
        'https://avenue-medical.vercel.app/',

      fallbackClass:
        'fallback-web'
    },
    
    {
      num: '04',
      slug: 'nova-health',
      name: 'Nova Health',

      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85',

      description:
        'A premium healthcare website concept focused on simplifying patient discovery, specialty navigation, physician discovery, and appointment journeys.',

      problem:
        'Healthcare websites can become difficult to navigate when specialties, physicians, services, and appointment pathways are presented without a clear and cohesive experience.',

      solution:
         'Designed a modern healthcare experience with smart care discovery, specialty exploration, physician filtering, patient journey storytelling, AI-assisted interactions, responsive layouts, subtle motion, and an interactive appointment workflow.',

      learned:
         'Strengthened skills in responsive frontend development, interaction design, accessibility, animation, visual hierarchy, healthcare UX, and production-oriented deployment.',

      tags: [
         'HTML',
          'CSS',
          'JavaScript',
          'Healthcare UX',
          'Responsive UI',
          'AI Experience'
        ],

        github:
         'https://github.com/Anya299/nova-health-demo',

       live:
         '',

       fallbackClass:
         'fallback-web'
    }


  ];


  var projectListEl =
    document.getElementById('project-list');


  function renderProjects() {

    if (!projectListEl) return;


    var html =
      PROJECTS.map(function (p) {

        return (

          '<article class="project-card reveal" ' +
          'data-slug="' + p.slug + '" ' +
          'tabindex="0" ' +
          'role="button" ' +
          'aria-label="View case study for ' +
          p.name +
          '">' +

            '<div class="project-visual" ' +
            'data-tag="' +
            p.fallbackClass
              .replace('fallback-', '')
              .toUpperCase() +
            '">' +

              '<img src="' +
              p.image +
              '" ' +
              'alt="' +
              p.name +
              ' interface preview" ' +
              'loading="lazy" ' +

              'onerror="this.style.display=\'none\'; ' +
              'this.parentElement.classList.add(' +
              '\'project-fallback\',\'' +
              p.fallbackClass +
              '\')">' +

            '</div>' +


            '<div class="project-info">' +

              '<span class="project-num">' +
              p.num +
              '</span>' +

              '<h3>' +
              p.name +
              '</h3>' +

              '<p>' +
              p.description +
              '</p>' +

              '<div class="tag-row">' +

                p.tags.map(function (t) {

                  return (
                    '<span class="tag">' +
                    t +
                    '</span>'
                  );

                }).join('') +

              '</div>' +


              '<div class="project-links">' +

                '<a href="' +
                p.github +
                '" target="_blank" rel="noopener" ' +
                'onclick="event.stopPropagation()">' +
                'GitHub' +
                '</a>' +


                (
                  p.live

                    ? (
                      '<a href="' +
                      p.live +
                      '" target="_blank" rel="noopener" ' +
                      'onclick="event.stopPropagation()">' +
                      'Live Demo' +
                      '</a>'
                    )

                    : ''
                ) +


                '<span class="case-study-link">' +
                'View case study ' +
                '<span class="arrow">→</span>' +
                '</span>' +

              '</div>' +

            '</div>' +

          '</article>'

        );

      }).join('');


    projectListEl.innerHTML = html;


    /* -----------------------------------------------
       Re-observe dynamically injected reveal elements
       ----------------------------------------------- */

    if ('IntersectionObserver' in window) {

      var io2 =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(function (entry) {

              if (entry.isIntersecting) {

                entry.target.classList.add('in');

                io2.unobserve(entry.target);

              }

            });

          },
          {
            threshold: 0.1
          }
        );


      projectListEl
        .querySelectorAll('.reveal')
        .forEach(function (el) {

          io2.observe(el);

        });

    } else {

      projectListEl
        .querySelectorAll('.reveal')
        .forEach(function (el) {

          el.classList.add('in');

        });

    }


    /* -----------------------------------------------
       PROJECT CARD HOVER TILT
       ----------------------------------------------- */

    if (!isTouch) {

      projectListEl
        .querySelectorAll('.project-card')
        .forEach(function (card) {


          card.addEventListener(
            'mousemove',
            function (e) {

              var rect =
                card.getBoundingClientRect();


              var x =
                (e.clientX - rect.left) /
                rect.width -
                0.5;


              var y =
                (e.clientY - rect.top) /
                rect.height -
                0.5;


              card.style.transform =
                'rotateY(' +
                (x * 3) +
                'deg) rotateX(' +
                (y * -3) +
                'deg)';

            }
          );


          card.addEventListener(
            'mouseleave',
            function () {

              card.style.transform = '';

            }
          );

        });

    }


    /* -----------------------------------------------
       CLICK / KEYBOARD → MODAL
       ----------------------------------------------- */

    projectListEl
      .querySelectorAll('.project-card')
      .forEach(function (card) {


        card.addEventListener(
          'click',
          function () {

            openModal(card.dataset.slug);

          }
        );


        card.addEventListener(
          'keydown',
          function (e) {

            if (
              e.key === 'Enter' ||
              e.key === ' '
            ) {

              e.preventDefault();

              openModal(card.dataset.slug);

            }

          }
        );

      });

  }


  /* =====================================================
     PROJECT MODAL
     ===================================================== */

  var modalOverlay =
    document.getElementById('project-modal');

  var lastFocused = null;


  function openModal(slug) {

    var p =
      PROJECTS.filter(function (x) {

        return x.slug === slug;

      })[0];


    if (!p || !modalOverlay) return;


    var modalNum =
      document.getElementById('modal-num');

    var modalTitle =
      document.getElementById('modal-title');

    var modalOverview =
      document.getElementById('modal-overview');

    var modalProblem =
      document.getElementById('modal-problem');

    var modalSolution =
      document.getElementById('modal-solution');

    var modalLearned =
      document.getElementById('modal-learned');

    var modalTags =
      document.getElementById('modal-tags');

    var modalGithub =
      document.getElementById('modal-github');

    var liveLink =
      document.getElementById('modal-live');


    if (modalNum) {

      modalNum.textContent = p.num;

    }


    if (modalTitle) {

      modalTitle.textContent = p.name;

    }


    if (modalOverview) {

      modalOverview.textContent =
        p.description;

    }


    if (modalProblem) {

      modalProblem.textContent =
        p.problem ||
        'Project problem statement will be documented as the case study develops.';

    }


    if (modalSolution) {

      modalSolution.textContent =
        p.solution ||
        'Project solution details will be documented as the case study develops.';

    }


    if (modalLearned) {

      modalLearned.textContent =
        p.learned ||
        'Key implementation learnings will be documented as the project evolves.';

    }


    if (modalTags) {

      modalTags.innerHTML =
        p.tags.map(function (t) {

          return (
            '<span class="tag">' +
            t +
            '</span>'
          );

        }).join('');

    }


    if (modalGithub) {

      modalGithub.href =
        p.github;

    }


    if (liveLink) {

      if (p.live) {

        liveLink.href =
          p.live;

        liveLink.style.display =
          'inline';

      } else {

        liveLink.style.display =
          'none';

      }

    }


    lastFocused =
      document.activeElement;


    modalOverlay.classList.add('open');

    document.body.style.overflow =
      'hidden';


    var modalClose =
      document.getElementById('modal-close');


    if (modalClose) {

      modalClose.focus();

    }

  }


  function closeModal() {

    if (!modalOverlay) return;


    modalOverlay.classList.remove('open');

    document.body.style.overflow = '';


    if (
      lastFocused &&
      lastFocused.focus
    ) {

      lastFocused.focus();

    }

  }


  if (modalOverlay) {

    var modalClose =
      document.getElementById('modal-close');


    if (modalClose) {

      modalClose.addEventListener(
        'click',
        closeModal
      );

    }


    modalOverlay.addEventListener(
      'click',
      function (e) {

        if (
          e.target === modalOverlay
        ) {

          closeModal();

        }

      }
    );


    document.addEventListener(
      'keydown',
      function (e) {

        if (
          e.key === 'Escape' &&
          modalOverlay.classList.contains('open')
        ) {

          closeModal();

        }

      }
    );

  }


  renderProjects();


  /* =====================================================
     SKILL CONSTELLATION
     ===================================================== */

  (function buildConstellation() {

    var svg =
      document.getElementById('constellation');

    if (!svg) return;


    var W = 460;

    var C = W / 2;

    var radius = 165;


    var skills = [
      'AI',
      'PYTHON',
      'WEB',
      'APIs',
      'DSA',
      'GITHUB',
      'BACKEND',
      'RESEARCH'
    ];


    var nodes =
      skills.map(function (label, i) {

        var angle =
          (i / skills.length) *
          Math.PI *
          2 -
          Math.PI / 2;


        return {

          label: label,

          x:
            C +
            radius *
            Math.cos(angle),

          y:
            C +
            radius *
            Math.sin(angle)

        };

      });


    var svgNS =
      'http://www.w3.org/2000/svg';


    var linesGroup =
      document.createElementNS(
        svgNS,
        'g'
      );


    var nodesGroup =
      document.createElementNS(
        svgNS,
        'g'
      );


    nodes.forEach(function (n) {

      var line =
        document.createElementNS(
          svgNS,
          'line'
        );


      line.setAttribute(
        'x1',
        C
      );

      line.setAttribute(
        'y1',
        C
      );

      line.setAttribute(
        'x2',
        n.x
      );

      line.setAttribute(
        'y2',
        n.y
      );

      line.setAttribute(
        'class',
        'const-line'
      );


      linesGroup.appendChild(line);

    });


    /* -----------------------------------------------
       CENTER NODE
       ----------------------------------------------- */

    var centerG =
      document.createElementNS(
        svgNS,
        'g'
      );


    var centerCircle =
      document.createElementNS(
        svgNS,
        'circle'
      );


    centerCircle.setAttribute(
      'cx',
      C
    );

    centerCircle.setAttribute(
      'cy',
      C
    );

    centerCircle.setAttribute(
      'r',
      30
    );

    centerCircle.setAttribute(
      'fill',
      'rgba(201,168,106,0.14)'
    );

    centerCircle.setAttribute(
      'stroke',
      '#c9a86a'
    );


    var centerText =
      document.createElementNS(
        svgNS,
        'text'
      );


    centerText.setAttribute(
      'x',
      C
    );

    centerText.setAttribute(
      'y',
      C + 4
    );

    centerText.setAttribute(
      'text-anchor',
      'middle'
    );

    centerText.setAttribute(
      'font-size',
      '12'
    );

    centerText.setAttribute(
      'fill',
      '#f2f0ea'
    );

    centerText.setAttribute(
      'font-family',
      'Fraunces, serif'
    );

    centerText.textContent =
      'ANANYA';


    centerG.appendChild(
      centerCircle
    );

    centerG.appendChild(
      centerText
    );


    /* -----------------------------------------------
       SKILL NODES
       ----------------------------------------------- */

    nodes.forEach(function (n) {

      var g =
        document.createElementNS(
          svgNS,
          'g'
        );


      g.setAttribute(
        'class',
        'const-node'
      );

      g.setAttribute(
        'tabindex',
        '0'
      );

      g.setAttribute(
        'role',
        'img'
      );

      g.setAttribute(
        'aria-label',
        n.label
      );


      var circle =
        document.createElementNS(
          svgNS,
          'circle'
        );


      circle.setAttribute(
        'cx',
        n.x
      );

      circle.setAttribute(
        'cy',
        n.y
      );

      circle.setAttribute(
        'r',
        5
      );

      circle.setAttribute(
        'fill',
        '#96959c'
      );


      var text =
        document.createElementNS(
          svgNS,
          'text'
        );


      var dx =
        n.x > C
          ? 12
          : n.x < C
            ? -12
            : 0;


      var anchor =
        n.x > C + 5
          ? 'start'
          : n.x < C - 5
            ? 'end'
            : 'middle';


      text.setAttribute(
        'x',
        n.x + dx
      );

      text.setAttribute(
        'y',
        n.y +
        (n.y > C ? 16 : -10)
      );

      text.setAttribute(
        'text-anchor',
        anchor
      );

      text.textContent =
        n.label;


      g.appendChild(circle);

      g.appendChild(text);


      function activate() {

        g.classList.add('active');

        circle.setAttribute(
          'r',
          7
        );

        circle.setAttribute(
          'fill',
          '#c9a86a'
        );

      }


      function deactivate() {

        g.classList.remove('active');

        circle.setAttribute(
          'r',
          5
        );

        circle.setAttribute(
          'fill',
          '#96959c'
        );

      }


      g.addEventListener(
        'mouseenter',
        activate
      );

      g.addEventListener(
        'mouseleave',
        deactivate
      );

      g.addEventListener(
        'focus',
        activate
      );

      g.addEventListener(
        'blur',
        deactivate
      );


      nodesGroup.appendChild(g);

    });


    svg.appendChild(
      linesGroup
    );

    svg.appendChild(
      centerG
    );

    svg.appendChild(
      nodesGroup
    );


    /* -----------------------------------------------
       SLOW ROTATION
       ----------------------------------------------- */

    if (!prefersReducedMotion) {

      var angleOffset = 0;


      function rotate() {

        angleOffset += 0.02;


        svg.style.transform =
          'rotate(' +
          Math.sin(
            angleOffset * 0.15
          ) *
          1.5 +
          'deg)';


        requestAnimationFrame(
          rotate
        );

      }


      rotate();

    }

  })();


  /* =====================================================
     CONTRIBUTION GRID
     ===================================================== */

  (function buildContribGrid() {

    var grid =
      document.getElementById(
        'contrib-grid'
      );

    if (!grid) return;


    var cells = '';


    for (
      var i = 0;
      i < 26 * 7;
      i++
    ) {

      var level =
        Math.random() > 0.72
          ? Math.ceil(
              Math.random() * 3
            )
          : 0;


      cells +=
        '<div class="cell" ' +
        'data-level="' +
        level +
        '"></div>';

    }


    grid.innerHTML =
      cells;

  })();


  /* =====================================================
     CONTACT FORM VALIDATION
     ===================================================== */

  var contactForm =
    document.getElementById(
      'contact-form'
    );


  if (contactForm) {

    contactForm.addEventListener(
      'submit',
      function (e) {

        e.preventDefault();


        var name =
          document.getElementById(
            'cf-name'
          );


        var email =
          document.getElementById(
            'cf-email'
          );


        var message =
          document.getElementById(
            'cf-message'
          );


        var status =
          document.getElementById(
            'form-status'
          );


        var valid = true;


        function setError(
          input,
          errId,
          msg
        ) {

          var errorElement =
            document.getElementById(
              errId
            );


          if (errorElement) {

            errorElement.textContent =
              msg;

          }


          if (msg) {

            valid = false;

          }

        }


        setError(
          name,
          'err-name',
          name &&
          name.value.trim()
            ? ''
            : 'Please enter your name.'
        );


        var emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        setError(
          email,
          'err-email',
          email &&
          emailPattern.test(
            email.value.trim()
          )
            ? ''
            : 'Please enter a valid email.'
        );


        setError(
          message,
          'err-message',
          message &&
          message.value.trim().length >= 10
            ? ''
            : 'Message should be at least 10 characters.'
        );


        if (!valid) {

          if (status) {

            status.textContent = '';

          }

          return;

        }


        /*
          No backend is connected yet.

          Connect Formspree, Web3Forms,
          or your own endpoint later.
        */


        if (status) {

          status.textContent =
            "This form isn't connected to a backend yet — see the README to wire it up.";

        }


        contactForm.reset();

      }
    );

  }


  /* =====================================================
     EASTER EGG — PRESS "A" THEN "S"
     ===================================================== */

  (function easterEgg() {

    var toast =
      document.getElementById(
        'easter-egg'
      );


    var buffer = [];


    var sequence = [
      'a',
      's'
    ];


    window.addEventListener(
      'keydown',
      function (e) {

        var tag =
          (e.target &&
            e.target.tagName) ||
          '';


        if (
          tag === 'INPUT' ||
          tag === 'TEXTAREA'
        ) {

          return;

        }


        buffer.push(
          e.key.toLowerCase()
        );


        if (
          buffer.length >
          sequence.length
        ) {

          buffer.shift();

        }


        if (
          buffer.join('') ===
          sequence.join('')
        ) {

          if (toast) {

            toast.classList.add(
              'show'
            );


            setTimeout(
              function () {

                toast.classList.remove(
                  'show'
                );

              },
              2600
            );

          }


          buffer = [];

        }

      }
    );

  })();


  /* =====================================================
     THREE.JS HERO
     Abstract rotating AI core with particles
     ===================================================== */

  (function initHero3D() {

    var wrap =
      document.getElementById(
        'hero-canvas-wrap'
      );


    if (!wrap) return;


    if (!window.THREE) {

      wrap.remove();

      return;

    }


    var testCanvas =
      document.createElement(
        'canvas'
      );


    var gl =
      testCanvas.getContext(
        'webgl'
      ) ||
      testCanvas.getContext(
        'experimental-webgl'
      );


    if (!gl) {

      wrap.remove();

      return;

    }


    var isLowPower =
      window.matchMedia(
        '(max-width: 760px)'
      ).matches ||
      (
        navigator.hardwareConcurrency &&
        navigator.hardwareConcurrency <= 4
      );


    var scene =
      new THREE.Scene();


    var camera =
      new THREE.PerspectiveCamera(
        45,
        wrap.clientWidth /
        wrap.clientHeight,
        0.1,
        100
      );


    camera.position.set(
      0,
      0,
      9
    );


    var renderer =
      new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });


    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        isLowPower
          ? 1.3
          : 2
      )
    );


    renderer.setSize(
      wrap.clientWidth,
      wrap.clientHeight
    );


    wrap.appendChild(
      renderer.domElement
    );


    /* -----------------------------------------------
       CORE
       ----------------------------------------------- */

    var coreGeo =
      new THREE.IcosahedronGeometry(
        2.1,
        1
      );


    var coreMat =
      new THREE.MeshBasicMaterial({
        color: 0xc9a86a,
        wireframe: true,
        transparent: true,
        opacity: 0.55
      });


    var core =
      new THREE.Mesh(
        coreGeo,
        coreMat
      );


    scene.add(core);


    /* -----------------------------------------------
       INNER CORE
       ----------------------------------------------- */

    var innerGeo =
      new THREE.IcosahedronGeometry(
        1.3,
        0
      );


    var innerMat =
      new THREE.MeshBasicMaterial({
        color: 0xf2f0ea,
        wireframe: true,
        transparent: true,
        opacity: 0.18
      });


    var inner =
      new THREE.Mesh(
        innerGeo,
        innerMat
      );


    scene.add(inner);


    /* -----------------------------------------------
       PARTICLE FIELD
       ----------------------------------------------- */

    var particleCount =
      isLowPower
        ? 220
        : 550;


    var positions =
      new Float32Array(
        particleCount * 3
      );


    for (
      var i = 0;
      i < particleCount;
      i++
    ) {

      var r =
        3.4 +
        Math.random() * 3.2;


      var theta =
        Math.random() *
        Math.PI *
        2;


      var phi =
        Math.acos(
          (Math.random() * 2) - 1
        );


      positions[i * 3] =
        r *
        Math.sin(phi) *
        Math.cos(theta);


      positions[i * 3 + 1] =
        r *
        Math.sin(phi) *
        Math.sin(theta);


      positions[i * 3 + 2] =
        r *
        Math.cos(phi);

    }


    var particleGeo =
      new THREE.BufferGeometry();


    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(
        positions,
        3
      )
    );


    var particleMat =
      new THREE.PointsMaterial({
        color: 0x8a7549,
        size: 0.035,
        transparent: true,
        opacity: 0.7
      });


    var particles =
      new THREE.Points(
        particleGeo,
        particleMat
      );


    scene.add(
      particles
    );


    /* -----------------------------------------------
       MOUSE PARALLAX
       ----------------------------------------------- */

    var mouseX = 0;

    var mouseY = 0;

    var targetRotX = 0;

    var targetRotY = 0;


    window.addEventListener(
      'mousemove',
      function (e) {

        mouseX =
          (e.clientX /
            window.innerWidth) *
            2 -
          1;


        mouseY =
          (e.clientY /
            window.innerHeight) *
            2 -
          1;


        targetRotY =
          mouseX * 0.35;


        targetRotX =
          mouseY * 0.2;

      }
    );


    var clock =
      new THREE.Clock();


    var rafId;


    function animate() {

      rafId =
        requestAnimationFrame(
          animate
        );


      var t =
        clock.getElapsedTime();


      core.rotation.y =
        t * 0.12 +
        targetRotY * 0.6;


      core.rotation.x =
        t * 0.05 +
        targetRotX * 0.6;


      inner.rotation.y =
        -t * 0.09;


      inner.rotation.x =
        t * 0.04;


      particles.rotation.y =
        t * 0.02;


      camera.position.x +=
        (
          targetRotY * 1.2 -
          camera.position.x
        ) * 0.03;


      camera.position.y +=
        (
          -targetRotX * 1.2 -
          camera.position.y
        ) * 0.03;


      camera.lookAt(
        scene.position
      );


      renderer.render(
        scene,
        camera
      );

    }


    if (prefersReducedMotion) {

      renderer.render(
        scene,
        camera
      );

    } else {

      animate();

    }


    /* -----------------------------------------------
       RESIZE
       ----------------------------------------------- */

    function handleResize() {

      var w =
        wrap.clientWidth;

      var h =
        wrap.clientHeight;


      camera.aspect =
        w / h;


      camera.updateProjectionMatrix();


      renderer.setSize(
        w,
        h
      );

    }


    window.addEventListener(
      'resize',
      handleResize
    );


    /* -----------------------------------------------
       PAUSE WHEN HERO IS OFF-SCREEN
       ----------------------------------------------- */

    if (
      'IntersectionObserver'
      in window
    ) {

      var heroElement =
        document.getElementById(
          'hero'
        );


      if (heroElement) {

        var heroObserver =
          new IntersectionObserver(
            function (entries) {

              entries.forEach(
                function (entry) {

                  if (
                    !prefersReducedMotion
                  ) {

                    if (
                      entry.isIntersecting &&
                      !rafId
                    ) {

                      animate();

                    }


                    if (
                      !entry.isIntersecting &&
                      rafId
                    ) {

                      cancelAnimationFrame(
                        rafId
                      );

                      rafId = null;

                    }

                  }

                }
              );

            },
            {
              threshold: 0.05
            }
          );


        heroObserver.observe(
          heroElement
        );

      }

    }

  })();


})();