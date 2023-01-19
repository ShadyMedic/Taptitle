$(function(){
    $("#watch-form").on('submit', loadVideo)
});

var subtitlesReader;

function loadVideo(event)
{
    event.preventDefault();

    let videoFile = $("#video-input").get(0).files[0]

    $("#video-src").attr("src", URL.createObjectURL(videoFile))
    $("#video-src").attr("type", videoFile.type)
    $("#video").get(0).load()
    
    let subtitlesFile = $("#subtitles-input").get(0).files[0]
    subtitlesReader = new SubtitlesReader(subtitlesFile)
    subtitlesReader.loadFile()
    
    $("#watch-form").slideUp()
    $("#watch-video").slideDown()
}

function debug() {
    //console.log($("#video").get(0).currentTime);
    console.log(subtitlesReader.getCurrentLine($("#video").get(0).currentTime));
}