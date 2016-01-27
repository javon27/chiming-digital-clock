$(document).ready(function () {
    var hour = get12Hour(),
        chimeCount,
        audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "clock-chime.mp3");
    audioElement.setAttribute("type", "audio/mpeg");
    setInterval(timer, 1000);
    
    function timer() {
        var now = new Date(),
            minutes = now.getMinutes(),
            seconds = now.getSeconds(),
            tmp;
        hour = get12Hour();
        
        minutes = ("0" + minutes).slice(-2);
        $(".clock").html(hour + ":" + minutes + ampm());

        if (minutes === "00" && seconds === 0) {
            $(".clock").addClass("blink");
            chimeCount = hour;
            playChime();
        }
    }
    
    function playChime() {
        if (chimeCount > 0) {
            audioElement.load();
            audioElement.play();
            chimeCount -= 1;
            setTimeout(playChime, 3500);
        } else {
            $(".clock").removeClass("blink");
        }
    }
    
    function get12Hour() {
        var tmp = (new Date()).getHours();
        if ((tmp%=12) === 0){
            tmp = 12;
        }
        return tmp;
    }
    
    function ampm() {
        var tmp = (new Date()).getHours();
        if (tmp < 12) {
            return "am";
        } else {
            return "pm";
        }
    }
});
