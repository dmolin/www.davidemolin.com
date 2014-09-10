var ViewHelpers = {

    collapsible: function(view) {
        view.$(".open-close").click(function(){
            $(this).next().slideToggle(400);
            if($(this).hasClass("current")) { $(this).removeClass("current"); } else { $(this).addClass("current"); }
         });
        return this;
    },

    loadFeeds: function( $cont, InOptions )
    {
        var options = $.extend( {
                        url:'empty.xml',
                        showTitle:true,
                        showTimestamp:true,
                        lines:150
                    }, InOptions ),
                shift = options.shift,
                cont = $cont;

        //if a "shift" interval is present, delay the feeds by that amount of milliseconds
        if( typeof shift !== 'undefined' && shift > 0 )
        {
            options.shift = 0;
            setTimeout( actualLoad, shift );
            return;
        }

        actualLoad();

        function actualLoad() {
            cont.html('<p>Wait, Feeds are loading...</p>');
            $.getFeed( {
                url: (options.type === 'json' ? '/jsonproxy' : '/proxy') + '.php?url=' + options.url,

                success: function(data) {
                    var toAppend = $(document.createElement( "div" )).addClass( "feed-list" ),
                            node,
                            i,
                            feed = { items: (data.items || data) },
                            map = {
                                link : (options.fields && options.fields.link) || 'link',
                                text : (options.fields && options.fields.description) || 'description',
                                title: (options.fields && options.fields.title) || 'title',
                            };

                    for( i = 0; i < feed.items.length; i++ )
                    {
                        node = feed.items[i];
                        $(toAppend).append(
                            "<div class='feed-item slide' data-slideshow-index='" + i + "'>" +
                            (options.showTitle ? "<span class='feed-title' ><a href='" + node[map.link] + "'>" + node[map.title] + "</a></span>" : "" ) +
                            (options.showTimestamp ? "<span class='feed-tstamp'>" + node.updated + "</span>" : "" ) +
                            "<p>" + node[map.text].substring(0,options.lines) + (node[map.text].length > options.lines ? "... <a href='" + node[map.link] + "'>Read More</a>" : "" ) +
                            "</p>" +
                            "</div>\n"
                        );
                    }
                    cont.empty();
                    cont.append( toAppend );
                    $(".feed-list", cont ).cycle({
                        fx: 'scrollUp',
                        timeout: options.timeout || 10000,
                        speed: 3000,
                        pause: 1,
                        cleartype: true,
                        cleartypeNoBg: true,
                        startingSlide: 0
                    });
                }
            });
        }
    },

    initSlideshow: function($context, options) {
        if(!$context) return;
        
        $context.slidesjs(_.extend({
            width: 960,
            height: 305,
            navigation: false
        }, options));
    }    
};

module.exports = ViewHelpers;
