$(function(){
    $("#watch-form").on('submit', loadVideo)
});

function loadVideo(event)
{
    event.preventDefault();

    let videoFile = $("#video-input").get(0).files[0]

    $("#video-src").attr("src", URL.createObjectURL(videoFile))
    $("#video-src").attr("type", videoFile.type)
    $("#video").get(0).load()
    
    let subtitlesFile = $("#subtitles-input").get(0).files[0]
    let subtitlesReader = new SubtitlesReader(subtitlesFile)
    subtitlesReader.loadFile()
    
    $("#watch-form").slideUp()
    $("#watch-video").slideDown()
}
