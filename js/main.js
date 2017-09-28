$('.carousel').carousel({
    interval: 5000
});

var contentHolder = $('#content-holder');
var isHistorySuported = !!(window.history && history.pushState);
var firstActiveIndex = $('.active').index();
var historyIsFresh = true;

$('#menu').on('click', 'a', function (e) {
    console.log('clicked');
    var $this = $(this);
    var li = $this.parent();

    if (li.hasClass('active')) {
        e.preventDefault();
        return;
    }

    var h1 = $('.main-content').find('h1');
    var data = {
        title: 'Askari-Nasr.com' + (h1.length ? ' - ' + h1.text() : ''),
        href: $this.attr('href'),
        activeIndex: li.index()
    };
    loadContent(data.href);

    li.addClass('active').siblings().removeClass('active');

    if (isHistorySuported)
        history.pushState(data, data.title, data.href);
    historyIsFresh = false;

    e.preventDefault();
});

if (isHistorySuported) {
    var index;
    $(window).on('popstate', function (e) {
        if (e.originalEvent.state) {
            loadContent(e.originalEvent.state.href);
            index = e.originalEvent.state.activeIndex;
        }
        else if (!historyIsFresh) {
            loadContent(document.URL);
            index = firstActiveIndex;
        }
        $('#menu li').eq(index).addClass('active').siblings().removeClass('active');
    });
}

function loadContent(href) {
    var loader = '<img id="loader" src="img/loader.gif" alt="Loading...">';
    contentHolder.html(loader).load(href + ' .main-content', function () {
        var content = $('.main-content');
        var h1 = content.find('h1');
        document.title = 'Askari-Nasr.com' + (h1.length ? ' - ' + h1.text() : '');
        $.smoothScroll({
            scrollTarget: content,
            offset: - $('#menu').height()
        });
    });
}