$(document).ready(function(){
    const educationPages = [
        {
            tag: "Page 1 / 4",
            program: "Software Engineering Technology",
            degree: "Bachelor of Technology",
            focus: "Software design, web development, systems analysis, databases, networking, and building reliable technical solutions.",
            status: "Currently studying — started May 4, 2026",
            school: "McMaster University",
            image: "images/McMaster.jpg",
            alt: "McMaster University",
            imageMode: "edu-fill"
        },
        {
            tag: "Page 2 / 4",
            program: "Computer Systems Technology: Software Development & Network Engineering",
            degree: "Advanced Diploma (3 Years)",
            focus: "Software development, networking, systems design, database management, troubleshooting, and applied programming.",
            status: "Completed — Jan 2018 to Dec 2020",
            school: "Sheridan College",
            image: "images/sheridan.jpg",
            alt: "Sheridan College",
            imageMode: "edu-fill"
        },
        {
            tag: "Page 3 / 4",
            program: "High School — Grade 8 to Grade 12",
            degree: "IGCSE O Levels and Edexcel A Levels",
            focus: "Core academic foundations including sciences, mathematics, communication, and preparation for higher education.",
            status: "Completed — Sept 2012 to May 2017",
            school: "Pakistan International School - English Section",
            image: "images/pises.jpeg",
            alt: "Pakistan International School - English Section",
            imageMode: "edu-contain"
        },
        {
            tag: "Page 4 / 4",
            program: "Junior to Middle School — LKG to Grade 7",
            degree: "School Graduation",
            focus: "Early academic foundation, communication, reading, writing, mathematics, and general school development.",
            status: "Completed — Sept 2003 to Sept 2012",
            school: "Sager International School",
            image: "images/sager.jpeg",
            alt: "Sager International School",
            imageMode: "edu-contain"
        }
    ];

    let eduIndex = 0;

    function updateEducationPage(){
        const page = educationPages[eduIndex];

        $("#eduPageTag").text(page.tag);
        $("#eduProgram").text(page.program);
        $("#eduDegree").text(page.degree);
        $("#eduFocus").text(page.focus);
        $("#eduStatus").text(page.status);
        $("#eduSchool").text(page.school);
        $("#eduImage")
            .attr("src", page.image)
            .attr("alt", page.alt)
            .removeClass("edu-fill edu-contain")
            .addClass(page.imageMode);

        $(".book-prev").prop("disabled", eduIndex === 0);
        $(".book-next").prop("disabled", eduIndex === educationPages.length - 1);
    }

    function getScrollAmount(track){
        const card = track.querySelector(":scope > *");
        if(!card) return 580;

        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || 0);

        return card.getBoundingClientRect().width + gap;
    }

    function updateCarouselButtons(trackId, prevSelector, nextSelector){
        const track = document.getElementById(trackId);
        if(!track) return;

        // Scroll-snap parks the first card a few px in (track padding), so allow a small margin
        const atStart = track.scrollLeft <= 8;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;

        $(prevSelector).prop("disabled", atStart);
        $(nextSelector).prop("disabled", atEnd);

        updateCarouselStatus(track, atEnd);
    }

    // "2 / 5" (or "2–3 / 7" when two cards fit) between the carousel arrows
    const carouselStatusIds = {
        workTrack: "workStatus",
        skillsTrack: "skillsStatus",
        projectsTrack: "projectsStatus"
    };

    function updateCarouselStatus(track, atEnd){
        const status = document.getElementById(carouselStatusIds[track.id]);
        if(!status) return;

        const total = track.children.length;
        const step = getScrollAmount(track);
        const visible = Math.max(1, Math.min(total, Math.round((track.clientWidth + 10) / step)));

        let first = Math.round(track.scrollLeft / step) + 1;
        if(atEnd) first = total - visible + 1;
        first = Math.min(Math.max(first, 1), total);

        const last = Math.min(total, first + visible - 1);
        status.textContent = (last > first ? first + "–" + last : first) + " / " + total;
    }

    function scrollTrack(trackId, direction, prevSelector, nextSelector){
        const track = document.getElementById(trackId);
        if(!track) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        track.scrollBy({
            left: getScrollAmount(track) * direction,
            behavior: reduceMotion ? "auto" : "smooth"
        });

        setTimeout(function(){
            updateCarouselButtons(trackId, prevSelector, nextSelector);
        }, 450);
    }

    updateEducationPage();

    // Certifications: one certificate per page, browsed like the education book
    const certPages = $(".cert-page");
    let certIndex = 0;

    function updateCertPage(){
        certPages.each(function(i){
            $(this).attr("aria-hidden", i === certIndex ? "false" : "true");
        });

        $(".cert-prev").prop("disabled", certIndex === 0);
        $(".cert-next").prop("disabled", certIndex === certPages.length - 1);
    }

    $(".cert-prev").click(function(){
        if(certIndex > 0){
            certIndex--;
            updateCertPage();
        }
    });

    $(".cert-next").click(function(){
        if(certIndex < certPages.length - 1){
            certIndex++;
            updateCertPage();
        }
    });

    updateCertPage();

    function initializeButtons() {

        const workTrack = document.getElementById("workTrack");
        const skillsTrack = document.getElementById("skillsTrack");
        const projectsTrack = document.getElementById("projectsTrack");
    
        if(workTrack){
            workTrack.scrollTo({
                left:0,
                behavior:"instant"
            });
        }
    
        if(skillsTrack){
            skillsTrack.scrollTo({
                left:0,
                behavior:"instant"
            });
        }

        if(projectsTrack){
            projectsTrack.scrollTo({
                left:0,
                behavior:"instant"
            });
        }
    
        // Left buttons OFF initially
        $(".work-prev").prop("disabled", true);
        $(".skills-prev").prop("disabled", true);
        $(".projects-prev").prop("disabled", true);
    
        // Right buttons ON initially
        $(".work-next").prop("disabled", false);
        $(".skills-next").prop("disabled", false);
        $(".projects-next").prop("disabled", false);
    
        // Refresh after browser fully renders
        setTimeout(function(){
    
            updateCarouselButtons(
                "workTrack",
                ".work-prev",
                ".work-next"
            );
    
            updateCarouselButtons(
                "skillsTrack",
                ".skills-prev",
                ".skills-next"
            );

            updateCarouselButtons(
                "projectsTrack",
                ".projects-prev",
                ".projects-next"
            );
    
        },300);
    }
    
    window.addEventListener("load", initializeButtons);
    
    // wait until everything renders
    window.addEventListener("load", initializeButtons);

    $(window).scroll(function(){
        if(this.scrollY > 20){
            $(".navbar").addClass("sticky");
        }else{
            $(".navbar").removeClass("sticky");
        }

        if(this.scrollY > 500){
            $(".scroll-btn").addClass("show");
        }else{
            $(".scroll-btn").removeClass("show");
        }
    });

    $(window).on("resize", function(){
        updateCarouselButtons("workTrack", ".work-prev", ".work-next");
        updateCarouselButtons("skillsTrack", ".skills-prev", ".skills-next");
        updateCarouselButtons("projectsTrack", ".projects-prev", ".projects-next");
    });

    $("#projectsTrack").on("scroll", function(){
        updateCarouselButtons("projectsTrack", ".projects-prev", ".projects-next");
    });

    $("#workTrack").on("scroll", function(){
        updateCarouselButtons("workTrack", ".work-prev", ".work-next");
    });

    $("#skillsTrack").on("scroll", function(){
        updateCarouselButtons("skillsTrack", ".skills-prev", ".skills-next");
    });

    $(".scroll-btn").click(function(){
        $("html, body").animate({scrollTop: 0}, 500);
    });

    function setMenuOpen(open){
        $(".navbar .menu").toggleClass("show", open);
        $(".menu-btn")
            .attr("aria-expanded", open ? "true" : "false")
            .attr("aria-label", open ? "Close menu" : "Open menu");
    }

    $(".menu-btn").click(function(){
        setMenuOpen(!$(".navbar .menu").hasClass("show"));
    });

    $(".menu-link").click(function(){
        setMenuOpen(false);
    });

    $(".book-prev").click(function(){
        if(eduIndex > 0){
            eduIndex--;
            updateEducationPage();
        }
    });

    $(".book-next").click(function(){
        if(eduIndex < educationPages.length - 1){
            eduIndex++;
            updateEducationPage();
        }
    });

    $(".work-prev").click(function(){
        scrollTrack("workTrack", -1, ".work-prev", ".work-next");
    });

    $(".work-next").click(function(){
        scrollTrack("workTrack", 1, ".work-prev", ".work-next");
    });

    $(".skills-prev").click(function(){
        scrollTrack("skillsTrack", -1, ".skills-prev", ".skills-next");
    });

    $(".skills-next").click(function(){
        scrollTrack("skillsTrack", 1, ".skills-prev", ".skills-next");
    });

    $(".projects-prev").click(function(){
        scrollTrack("projectsTrack", -1, ".projects-prev", ".projects-next");
    });

    $(".projects-next").click(function(){
        scrollTrack("projectsTrack", 1, ".projects-prev", ".projects-next");
    });

    // Element that opened the current popup, so focus can return to it on close
    let modalOpener = null;

    function closeModals(){
        if(!$(".modal.show").length) return;

        $(".modal").removeClass("show").attr("aria-hidden", "true");
        $("body").css("overflow", "");

        if(modalOpener){
            modalOpener.focus();
            modalOpener = null;
        }
    }

    $(".more-btn, .resume-btn").click(function(){
        const modalId = $(this).data("modal");
        modalOpener = this;
        $("#" + modalId).addClass("show").attr("aria-hidden", "false");
        $("#" + modalId + " .close-modal").trigger("focus");
        $("body").css("overflow", "hidden");
    });

    $(".close-modal, .modal").click(function(event){
        if(event.target !== this) return;

        closeModals();
    });

    $(document).keydown(function(event){
        if(event.key === "Escape"){
            if($(".navbar .menu").hasClass("show")){
                setMenuOpen(false);
                $(".menu-btn").trigger("focus");
            }
            closeModals();
            return;
        }

        // Keep Tab focus inside an open popup
        const openModal = $(".modal.show");
        if(event.key !== "Tab" || !openModal.length) return;

        const focusable = openModal.find("a[href], button:not([disabled])").filter(":visible");
        if(!focusable.length) return;

        const first = focusable.get(0);
        const last = focusable.get(focusable.length - 1);

        if(event.shiftKey && document.activeElement === first){
            event.preventDefault();
            last.focus();
        }else if(!event.shiftKey && document.activeElement === last){
            event.preventDefault();
            first.focus();
        }
    });
});
