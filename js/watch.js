$(function(){
    $("#watch-form").on('submit', loadVideo)
});

function loadVideo(event)
{
    event.preventDefault();

    console.log("Processing")
    let videoFile = $("#video-input").get(0).files[0]

    console.log(videoFile)

    $("#video-src").attr("src", URL.createObjectURL(videoFile))
    $("#video-src").attr("type", videoFile.type)
    $("#video").get(0).load()
    
    let subtitlesFile = $("#subtitles-input").get(0).files[0]
    console.log(subtitlesFile)
    let subtitlesReader = new SubtitlesReader(subtitlesFile)
    subtitlesReader.loadFile()
    console.log(subtitlesReader.subtitlesFileContents)
    
    $("#watch-form").slideUp()
    $("#watch-video").slideDown()
}
