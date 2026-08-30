/* =====================================================
   HASAN DESIGN STUDIO
   Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= CURRENT YEAR ================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ================= MOBILE MENU ================= */

    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const navContainer = document.querySelector(".nav-container");

    let menuButton = null;

    if (navContainer && navMenu) {

        menuButton = document.createElement("button");

        menuButton.classList.add("mobile-menu-btn");

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuButton.innerHTML = "☰";

        navContainer.appendChild(menuButton);


        /* Open / Close Menu */

        menuButton.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {

                menuButton.innerHTML = "✕";

                menuButton.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            } else {

                menuButton.innerHTML = "☰";

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });

    }


    /* Close Menu After Clicking Link */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuButton) {

                menuButton.innerHTML = "☰";

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });

    });


    /* ================= SCROLL ANIMATION ================= */

    const animatedElements = document.querySelectorAll(
        ".service-card, .about-text, .about-box, .hero-text, .hero-card"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        animatedElements.forEach(element => {

            element.classList.add("hidden");

            observer.observe(element);

        });

    }


    /* ================= NAVBAR SHADOW ================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 20) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* ================= ACTIVE NAVIGATION ================= */

    const sections = document.querySelectorAll(
        "section[id]"
    );


    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });


    /* ================= SMOOTH ANCHOR SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                targetId === "#" ||
                !document.querySelector(targetId)
            ) {
                return;
            }


            event.preventDefault();


            const target =
                document.querySelector(targetId);


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* ================= BUTTON FEEDBACK ================= */

    const orderButtons =
        document.querySelectorAll(
            ".primary-btn, .nav-btn"
        );


    orderButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.add("clicked");


            setTimeout(() => {

                button.classList.remove("clicked");

            }, 300);

        });

    });


    /* ================= PORTFOLIO FILTER ================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const portfolioCards =
        document.querySelectorAll(".portfolio-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            /* Remove active from all buttons */

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            /* Add active to clicked button */

            button.classList.add("active");


            /* Get selected category */

            const filter =
                button.getAttribute("data-filter");


            /* Filter cards */

            portfolioCards.forEach(card => {

                const category =
                    card.getAttribute("data-category");


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.classList.remove("hide");

                    card.classList.add("show-card");

                } else {

                    card.classList.remove("show-card");

                    card.classList.add("hide");

                }

            });

        });

    });


    /* ========================================
       FORMSPREE CONTACT / ORDER FORM
    ======================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const submitButton =
                    contactForm.querySelector(
                        ".contact-submit"
                    );


                const formMessage =
                    document.getElementById(
                        "formMessage"
                    );


                /* Safety check */

                if (!submitButton) {
                    console.error(
                        "Submit button not found."
                    );
                    return;
                }


                /* Button loading */

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";


                /* Clear previous message */

                if (formMessage) {

                    formMessage.textContent = "";

                    formMessage.className =
                        "form-message";

                }


                /* Send form to Formspree */

                fetch(
                    "https://formspree.io/f/xnpqngvl",
                    {

                        method: "POST",

                        body:
                            new FormData(contactForm),

                        headers: {

                            "Accept":
                                "application/json"

                        }

                    }
                )


                .then(async function (response) {

                    const data =
                        await response.json();


                    if (response.ok) {

                        /* Success */

                        if (formMessage) {

                            formMessage.textContent =
                                "✓ Your order request has been sent successfully!";

                            formMessage.className =
                                "form-message success";

                        }


                        /* Clear form */

                        contactForm.reset();


                        /* Restore button */

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Send Order Request";


                    } else {

                        throw new Error(

                            data.errors

                                ? data.errors
                                    .map(
                                        error =>
                                            error.message
                                    )
                                    .join(", ")

                                : "Form submission failed."

                        );

                    }

                })


                .catch(function (error) {

                    console.error(
                        "Formspree Error:",
                        error
                    );


                    /* Error message */

                    if (formMessage) {

                        formMessage.textContent =
                            "✕ Something went wrong. Please try again or contact us on WhatsApp.";

                        formMessage.className =
                            "form-message error";

                    }


                    /* Restore button */

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Send Order Request";

                });

            }
        );

    }

});
