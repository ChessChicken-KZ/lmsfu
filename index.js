const { Plugin } = require('powercord/entities');


module.exports = class FastSearch extends Plugin
{
  startPlugin () {
    powercord.api.commands.registerCommand({
      command: 'search',
      description: 'Search by using Search Services',
      usage: '{c} <search engine> [...search terms]',
      executor: async args => {
        if (args.length < 2) {
          return {
            send: false,
            result: `\n Usage: \n .search <engine> [thing(s) you want to search] \n Avaliable engines: \n google, duckduckgo, bing, yandex`
          };
        }

        var searcheng = args.join(' ').match(/(\w+\s)/)[0].trim();
        var tosearch = args.join(' ').replace(searcheng,"").trim();
      

        let queryString = new URLSearchParams();
        queryString = 'q='.concat(tosearch.split(' ').join('+'));
    
        let result1;
    
        if(searcheng.toString().toUpperCase() == "GOOGLE" || searcheng.toString().toUpperCase() == "G")
        {
          result1 = `https://www.google.com/search?${queryString}`;
        }else if(searcheng.toString().toUpperCase() =="DUCKDUCKGO" || searcheng.toString().toUpperCase() == "D")
        {
          result1 = `https://duckduckgo.com/?${queryString}`;
        }else if(searcheng.toString().toUpperCase() == "BING" || searcheng.toString().toUpperCase() == "B")
        {
          result1 = `https://bing.com/?${queryString}`;
        }else if(searcheng.toString().toUpperCase() == "YANDEX" || searcheng.toString().toUpperCase() == "Y")
        {
          result1 = `https://yandex.ru/?${queryString}`;
        }else if(searcheng.toString().toUpperCase() == "ALL" || searcheng.toString().toUpperCase() == "A")
        {
          return {
            send: true,
            result: `https://www.google.com/search?${queryString} \n https://duckduckgo.com/?${queryString} \n https://bing.com/?${queryString} \n https://yandex.ru/?${queryString}`
          };
        }else
        {
          return {
            send: false,
            result: `\n Error while trying to make a URL :P`
          };
        }
    
    
        return {
          send: true,
          result: result1
        };
        }
    });
  }

  pluginWillUnload () {
    powercord.api.commands.unregisterCommand('search');
  }
};