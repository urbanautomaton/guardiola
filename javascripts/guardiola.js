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
  intro: ["Don't be ridiculous", "Of course not", "You're off your nut", "Get to fuck", "Stop taking the piss", "Are you taking the piss? Sheesh", "For fuck's sake", "Oh, piss off", "Get a fucking grip"],
  insult: ["chump", "suppurating kidney", "charlie", "turnip", "unpleasant comestible", "hamtoucher", "player of the pink oboe", "fan of Paul McCartney", "execrable human", "ruin", "homunculus"],
  verb: ["revolutionising", "developing a new technique for", "rethinking", "turning his hand to", "reinventing", "demolishing the world of", "winning at"],
  occupation: ["fish husbandry", "gregorian plainchant", "molecular gastronomy", "the lyric poem", "french knitting", "Klingon opera", "timber technology"],
  place: ["in Botswana", "in a small monastery outside Brive", "on a dirigible circling the Kremlin", "in a walk-in wardrobe that only opens on Thursdays", "in a hand-built reproduction Ford Cortina", "on the Kazakh/Kyrgyz border"]
};

Guardiola.random = function(thing) {
  var options = Guardiola.data[thing];
  options.shuffle();
  return options[0];
};

jQuery(document).ready(function($) {
  for (k in Guardiola.data) {
    Guardiola.data[k].shuffle();
  }
  $("#submit").click(function() {
    $(this).html("Check again!");
    var answer_source = $("#answer-template").html();
    var answer_template = Handlebars.compile(answer_source);
    var answer_context = {}
    for (k in Guardiola.data) {
      answer_context[k] = Guardiola.data[k][0];
    }
    var answer_html = answer_template(answer_context);
    console.log(answer_html);
    $("#answer").html(answer_html);
    for (k in Guardiola.data) {
      Guardiola.data[k].unshift(Guardiola.data[k].pop());
    }
    return false;
  });
});
