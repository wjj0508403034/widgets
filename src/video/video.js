'use strict';

angular.module('huoyun.widget').factory("Video", ["$timeout", "$log", "video", function($timeout, $log, videoProvider) {

  function Video(elem, fps) {
    this.elem = elem;
    this.duration = elem.duration;
    this.height = elem.videoHeight;
    this.width = elem.videoWidth;
    this.fps = fps || 15;
    this.defaultPlaybackRate = elem.defaultPlaybackRate;
    this.currentTime = elem.currentTime;
    this.percentage = 0;
    this.totalFrames = parseInt((this.fps * this.duration).toFixed(0));
    this.currentFrame = 0;
    this.status = "loaded";

    var timer = null;
    var timer_interval = 8;

    this.setTimerInterval = function(val) {
      timer_interval = val;
    };

    this.startTimer = function() {
      if (this.status === "play") {
        var that = this;
        timer = setInterval(function() {
          $timeout(function() {
            that.setCurrentTime(that.elem.currentTime);
          });
        }, timer_interval / that.getPlaybackRate());
      } else {
        this.stopTimer();
      }
    };

    this.stopTimer = function() {
      clearInterval(timer);
      timer = null;
    };
  }

  Video.prototype.setFps = function(fps) {
    this.fps = fps;
  };

  Video.prototype.play = function() {
    this.elem.play();
    this.status = "play";
    this.startTimer();
  };

  Video.prototype.pause = function() {
    this.status = "pause";
    this.elem.pause();
    this.stopTimer();
  };

  Video.prototype.getPlaybackRate = function() {
    return this.elem.playbackRate;
  };

  Video.prototype.changeRate = function(rate) {
    this.elem.playbackRate = rate;
  };

  Video.prototype.changeTime = function(time) {
    if (time < 0) {
      this.elem.currentTime = 0;
      this.setCurrentTime(0);
      return;
    }

    if (time > this.duration) {
      this.elem.currentTime = this.duration;
      this.setCurrentTime(this.duration);
      return;
    }

    this.elem.currentTime = time;
    this.setCurrentTime(time);
  };

  Video.prototype.setCurrentTime = function(currentTime) {
    this.currentTime = currentTime;
    this.percentage = this.currentTime / this.duration;
    this.currentFrame = parseInt((this.fps * currentTime).toFixed(0));
  };

  Video.prototype.previousFrame = function() {
    if (this.currentFrame > 0) {
      this.changeTime((this.currentFrame - 1) * 1.0 / this.fps);
    }
  };

  Video.prototype.nextFrame = function() {
    if (this.currentFrame < this.totalFrames) {
      this.changeTime((this.currentFrame + 1) * 1.0 / this.fps);
    }
  };

  Video.prototype.fastForward = function() {
    let time = this.currentTime + videoProvider.step * this.getPlaybackRate();
    this.changeTime(time);
  };

  Video.prototype.fastBackward = function() {
    let time = this.currentTime - videoProvider.step * this.getPlaybackRate();
    this.changeTime(time);
  };

  Video.prototype.setPrecent = function(precent) {
    if (precent < 0) {
      precent = 0;
    } else if (precent > 1) {
      precent = 1;
    }
    this.changeTime(this.duration * precent);
  };

  return Video;
}]);