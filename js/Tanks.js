var mod = (function() {

  var privateProp = 'Hey I am private';

  privateProp = 'some change I want to make';

  return {
    publicProp: 'Hey I am public',
    publicProp: 'Hey I am public',
    publicProp: 'Hey I am public'
  };

}())