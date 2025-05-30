// ExamClockCore from https://github.com/L33Z22L11/ExamClock

let timer = {
  ele: document.getElementById("timer").children,
  start: new Date(0), end: new Date(0), now: new Date(),
  list: function ($) {
    // 使用周日作为每周起始
    $("考试", "24-12-29 00:00", "25-01-12 00:00")
    $("寒假", "25-01-12 00:00", "25-02-24 00:00")
    $("", "25-02-24 00:00", "25-06-29 00:00")
    $("考试", "25-06-29 00:00", "25-07-13 00:00")
    $("暑假", "25-07-13 00:00", "25-08-31 00:00")
    $("", "25-09-01 00:00", "26-01-04 00:00")
  }
}

timer.try = function (nextTitle, nextStart, nextEnd) {
  nextStart = new Date(`20${nextStart}+08:00`)
  nextEnd = new Date(`20${nextEnd}+08:00`)
  if (timer.now > timer.end && timer.now <= nextEnd) {
    timer.title = nextTitle
    timer.start = nextStart
    timer.end = nextEnd
  }
}

timer.update = function () {
  this.now = new Date()
  if (this.now > this.end) this.list(this.try)
  let today = {
    week: Math.ceil(this.start.getDay() / 7 + (this.now - this.start) / 6048E5),
    passed: Math.ceil((this.now - this.start) / 864E5),
    left: Math.ceil((this.end - this.now) / 864E5),
    all: Math.ceil((this.end - this.start) / 864E5),
    progress: ((this.now - this.start) / (this.end - this.start)) * 100,
  }
  if (!today.all) {
    this.ele[2].remove()
    this.ele[1].remove()
    this.ele[0].innerHTML = "计时器未配置"
    return
  }
  this.ele[0].innerHTML = `${this.now.getMonth() + 1}.${this.now.getDate()} ${this.title}第${today.week}周`
  this.ele[1].innerHTML = `第${today.passed}/${today.all}天 ${today.progress.toFixed(0)}%`
  this.ele[2].style.width = `${today.progress}%`
}

timer.update()
