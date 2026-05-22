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

        const atStart = track.scrollLeft <= 2;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;

        $(prevSelector).prop("disabled", atStart);
        $(nextSelector).prop("disabled", atEnd);
    }

    function scrollTrack(trackId, direction, prevSelector, nextSelector){
        const track = document.getElementById(trackId);
        if(!track) return;

        track.scrollBy({
            left: getScrollAmount(track) * direction,
            behavior: "smooth"
        });

        setTimeout(function(){
            updateCarouselButtons(trackId, prevSelector, nextSelector);
        }, 450);
    }

    updateEducationPage();

    function initializeButtons() {

        const workTrack = document.getElementById("workTrack");
        const skillsTrack = document.getElementById("skillsTrack");
    
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
    
        // Left buttons OFF initially
        $(".work-prev").prop("disabled", true);
        $(".skills-prev").prop("disabled", true);
    
        // Right buttons ON initially
        $(".work-next").prop("disabled", false);
        $(".skills-next").prop("disabled", false);
    
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

    $(".menu-btn").click(function(){
        $(".navbar .menu").toggleClass("show");
    });

    $(".menu-link").click(function(){
        $(".navbar .menu").removeClass("show");
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

    $(".more-btn, .resume-btn").click(function(){
        const modalId = $(this).data("modal");
        $("#" + modalId).addClass("show").attr("aria-hidden", "false");
        $("body").css("overflow", "hidden");
    });

    $(".close-modal, .modal").click(function(event){
        if(event.target !== this) return;

        $(".modal").removeClass("show").attr("aria-hidden", "true");
        $("body").css("overflow", "");
    });

    $(document).keydown(function(event){
        if(event.key === "Escape"){
            $(".modal").removeClass("show").attr("aria-hidden", "true");
            $("body").css("overflow", "");
        }
    });
});
