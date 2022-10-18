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
    $("#video").get(0).load();

    $("#watch-form").slideUp();
    $("#watch-video").slideDown();
    //let subtitlesFile = $("#subtitles-input").value;
    //console.log(subtitlesFile);
}
