$(document).ready(function () {
    var hour = get12Hour(),
        chimeCount,
        chimeAudioElement = document.createElement("audio"),
        tickAudioElement = document.createElement("audio");
    chimeAudioElement.setAttribute("src", "clock-chime.mp3");
    chimeAudioElement.setAttribute("type", "audio/mpeg");
    tickAudioElement.setAttribute("src", "clock-tick.mp3");
    tickAudioElement.setAttribute("type", "audio/mpeg");
    
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
        } else if (chimeAudioElement.paused) {
            playTick();
        }
    }
    
    function playChime() {
        if (chimeCount > 0) {
            chimeAudioElement.load();
            chimeAudioElement.play();
            chimeCount -= 1;
            setTimeout(playChime, 3500);
        } else {
            $(".clock").removeClass("blink");
        }
    }
    
    function playTick() {
        tickAudioElement.load();
        tickAudioElement.play();
        setTimeout(function(){
            tickAudioElement.pause();
        }, 300);
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
