$(function() {
    $(".carousel-prev").on('click', carouselPrev)
    $(".carousel-next").on('click', carouselNext)
})

function carouselPrev(event) {
    let $current = $(event.target).closest(".carousel").find(".carousel-displayed")
    let $future = $current.prev(".carousel-element")
    if ($future.get(0) === undefined) {
        $future = $current.closest(".carousel").children(".carousel-element").last()
    }
    $current.removeClass("carousel-displayed")
    $future.addClass("carousel-displayed")
}

function carouselNext(event) {
    let $current = $(event.target).closest(".carousel").find(".carousel-displayed")
    let $future = $current.next(".carousel-element")
    if ($future.get(0) === undefined) {
        $future = $current.closest(".carousel").children(".carousel-element").first()
    }
    $current.removeClass("carousel-displayed")
    $future.addClass("carousel-displayed")
}
