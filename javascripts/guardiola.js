var Guardiola = {} || Guardiola;

// Add Fisher-Yates shuffle function to Array prototype
Array.prototype.shuffle = function() {
  var len = this.length;
  var i = len;
   while (i--) {
    var p = parseInt(Math.random()*len);
    var t = this[i];
    this[i] = this[p];
    this[p] = t;
  }
};

Guardiola.data = {
  intro: ["Don't be ridiculous", "Of course not", "You're off your nut"],
  insult: ["chump", "suppurating kidney", "charlie"],
  verb: ["revolutionising", "developing a new technique for"],
  occupation: ["fish husbandry", "gregorian plainchant"],
  place: ["in Botswana", "in a small monastery outside Brive", "on a dirigible circling the Kremlin"]
};

Guardiola.random = function(thing) {
  var options = Guardiola.data[thing];
  options.shuffle();
  return options[0];
};

jQuery(document).ready(function($) {
  $("#submit").click(function() {
    $(this).html("Check again!");
    var answer_source = $("#answer-template").html();
    var answer_template = Handlebars.compile(answer_source);
    var answer_context = {}
    for (k in Guardiola.data) {
      answer_context[k] = Guardiola.random(k);
    }
    var answer_html = answer_template(answer_context);
    console.log(answer_html);
    $("#answer").html(answer_html);
    return false;
  });
});
