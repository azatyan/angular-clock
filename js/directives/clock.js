app.directive('clock', function ($parse) {
    return {
        restrict: 'A',
        compile: function compileFn(lElement, attrs) {
            return function linkFn(scope, lElement, attrs) {
                var width = attrs['width']
                var height = attrs['height']
                // Parameters
                scope.circleWidth = 6
                scope.secondWidth = 2
                scope.minuteWidth = 4
                scope.hourWidth = 8
                scope.clockColor = attrs['color']
                scope.startX = width / 2
                scope.startY = height / 2
                scope.circleRadius = height / 2 - 20
                scope.digitsLength = scope.circleRadius -  width/20 * 1
                scope.secondLength = scope.circleRadius - width/20 * 2
                scope.minuteLength = scope.circleRadius - width/20 * 3
                scope.hourLength = scope.circleRadius - width/20 * 4


                // Update Seconds Arrow
                scope.updateSecondsArrow = function () {
                    var angle = (2 * Math.PI / 60 ) * scope.time.getSeconds() + Math.PI
                    scope.Sx = scope.startX + scope.secondLength * -Math.sin(angle)
                    scope.Sy = scope.startY + scope.secondLength * Math.cos(angle)
                }

                // Update Minute Arrow
                scope.updateMinuteArrow = function () {
                    var angle = (2 * Math.PI / 60 ) * scope.time.getMinutes() + Math.PI
                    scope.Mx = scope.startX + scope.minuteLength * -Math.sin(angle)
                    scope.My = scope.startY + scope.minuteLength * Math.cos(angle)
                }

                // Update Hour Arrow
                scope.updateHourArrow = function () {
                    var hours = scope.time.getHours()
                    if (hours > 12) {
                        hours -= 12
                    } else if (hours === 0) {
                        hours = 12
                    }
                    hours += scope.time.getMinutes() / 60

                    var angle = (2 * Math.PI / 12  ) * hours + Math.PI
                    scope.Hx = scope.startX + scope.hourLength * -Math.sin(angle)
                    scope.Hy = scope.startY + scope.hourLength * Math.cos(angle)
                }

                // Arrow drawing function
                scope.drawArrow = function (canvas, x, y, width) {
                    canvas.beginPath()
                    canvas.moveTo(scope.startX, scope.startY)
                    canvas.lineTo(x, y)
                    canvas.lineWidth = width
                    canvas.strokeStyle = scope.clockColor
                    canvas.stroke()
                }

                // get canvas
                var canvas = lElement[0].getContext("2d")

                scope.$watch('Sx+Sy', function () {

                    // clear canvas
                    canvas.clearRect(0, 0, width, height)

                    // draw clock small circle
                    canvas.arc(scope.startX, scope.startY, 5, 0, 2 * Math.PI)
                    canvas.fillStyle = scope.clockColor
                    canvas.fill()

                    // draw clock circle
                    canvas.beginPath()
                    canvas.lineWidth = scope.circleWidth
                    canvas.strokeStyle = scope.clockColor
                    canvas.arc(scope.startX, scope.startY, scope.circleRadius, 0, 2 * Math.PI)
                    canvas.stroke()

                    // draw arrows
                    scope.drawArrow(canvas, scope.Sx, scope.Sy, scope.secondWidth)
                    scope.drawArrow(canvas, scope.Mx, scope.My, scope.minuteWidth)
                    scope.drawArrow(canvas, scope.Hx, scope.Hy, scope.hourWidth)

                    // draw digits
                    canvas.font = "bold 11pt Courier"
                    canvas.fillStyle = scope.clockColor;
                    for (var i = 12; i > 0; i--) {
                        var angle = (2 * Math.PI / 12  ) * i + Math.PI
                        var x = scope.startX - 4 +  scope.digitsLength * -Math.sin(angle);
                        var y = scope.startY + 4 + scope.digitsLength * Math.cos(angle);
                        canvas.fillText(i, x, y);
                    }

                    // copyright
                    canvas.font = "bold 8pt Courier"
                    canvas.fillStyle = scope.clockColor;
                    canvas.fillText("ArmCoder(c)", width/2-40, 80 * height/100);

                }, true)
            }
        }
    }
})