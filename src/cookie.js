// https://www.thesitewizard.com/javascripts/cookies.shtml
module.exports = {

  set_cookie: function(cookie_name, cookie_value, lifespan_in_days, valid_domain) {
    var domain_string = valid_domain ? ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name + "=" + encodeURIComponent( cookie_value ) +
        "; max-age=" + 60 * 60 * 24 * lifespan_in_days +
        "; path=/" + domain_string ;
  },

  get_cookie: function(cookie_name) {
    var cookie_string = document.cookie ;
    if (cookie_string.length !== 0) {
      var cookie_array = cookie_string.split( '; ' );
      for (var i = 0; i < cookie_array.length; i++) {
        var cookie_value = cookie_array[i].match( cookie_name + '=(.*)');
        if (cookie_value != null) {
          return decodeURIComponent(cookie_value[1]);
        }
      }
    }
    return '' ;
  },

  delete_cookie: function(cookie_name, valid_domain) {
    var domain_string = valid_domain ? ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name + "=; max-age=0; path=/" + domain_string ;
  }
}