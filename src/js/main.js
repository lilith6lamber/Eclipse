$(document).ready(function () {

    AOS.init();

    lightbox.option({
        'albumLabel': ''
    });

    let ts = $('#translators-slider').lightSlider({
        item: 4,
        loop: true,
        slideMove: 1,
        controls: false,
        pager: false,
        keyPress: true,
        slideMargin: 30,
        responsive : [
            {
                breakpoint: 769,
                settings: {
                    item: 3,
                    slideMove: 1
                }
            },
            {
                breakpoint: 481,
                settings: {
                    item: 1,
                    slideMove: 1
                }
            }
        ]
    });

    $('#presentation').lightSlider({
        item: 1,
        loop: true,
        slideMove: 1,
        controls: false,
        pager: true,
        keyPress: true,
        auto: true,
        mode: 'fade',
        speed: 2000
    });

    $('#ad-slider').lightSlider({
        item: 1,
        loop: true,
        slideMove: 1,
        controls: false,
        pager: true,
        keyPress: true,
        mode: 'fade',
        auto: true,
        speed: 2000
    });

    $('#prev').click(function (e) { 
        e.preventDefault();
        ts.goToPrevSlide();
    });
    $('#next').click(function (e) { 
        e.preventDefault();
        ts.goToNextSlide();
    });

    $('.menu-trigger').click(function (e) { 
        e.preventDefault();
        $('.nav-list').toggleClass('active_on_touch');
    });

    $(window).resize(function () { 
        replaceMarkup();
    });

    replaceMarkup();
});

function replaceMarkup() {
    const arr = [
        `Переводчики-консультанты, которые будут сопровождать вас в
        заграничной командировке`,
        `Переводчики для получасовых переговоров и переводчики для
        месячного сопровождения во время визита к вашим зарубежным
        партнерам`,
        `Переводчики, специaлизирующиеся на конкретных отраслях -
        от атомной энергетики до дипломатического протокола`,
        `Переводчики для срочных мероприятий – у нас есть
        специалисты, готовые помочь вам прямо сейчас`,
        `Переводчики-проводники из числа местных жителей, которые
        встретят вас после перелета в другую страну, будь то
        Швеция, Германия, Китай или Конго`,
        `Переводчики под конкретный запрос – мужчины и женщины,
        молодые и пожилые, брюнеты и блондинки, европейцы и азиаты
        и т.д.`,
        `Синхронные переводчики и необходимое оборудование`
    ];
    let html = '';
    for (let i = 0; i < arr.length; i++) {
        let listItem = arr[i];
        html += `<li class="list-item"><p>${listItem}</p></li>`;
    }
    if ($(window).width() < 481) {
        $('#gallery').html(`<ul id="reasons">${html}</ul>`);
    }
}