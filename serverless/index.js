// Fulfill Google Home Action

function getActionContext(intent, resolvedQuery) {
    let dashes = `\n${'-'.repeat(40)}\n`;
    let actionContext = `${dashes}Intent is ${intent}${dashes}`;

    return actionContext ? actionContext : 'Unable to get intent.';
}

module.exports = async (context, req) => {
    const intent = req.body.result.action;
    const resolvedQuery = req.body.result.resolvedQuery;
    context.log(getActionContext(intent, resolvedQuery));

    switch (intent) {
        case 'what_is_serverless':
            context.res.send({
                speech: "You simoultaneously have a server and you don't have a server. " +
                "In a sense, serverless is Schroedinger's compute."
            });
            break;
        
        case 'seriously_serverless':
            context.res.send({
                speech: "Alright... Serverless is a cloud computing execution model that changes the way " +
                "you think about writing and maintaining applications. Focus on your code, " + 
                "not servers, and abstract away everything else. The best code is no code at all, " +
                "the second best code is someone else's code."
            });
            break;

        case 'get_news':
            const feedparser = require('feedparser-promised');
            const feedUrl = 'https://blogs.msdn.microsoft.com/appserviceteam/feed/';
            let items = await feedparser.parse(feedUrl);
            let title = items[2].title;
            let author = items[2].author;
            let date = Date.parse(items[2].pubDate);
            let hoursDelta = Math.floor(date / 1000 / 60);
            let daysDelta = hoursDelta % 24;
            context.res.send({
                speech: `Here is the title of the most recent blog post. ${title}. ` +
                    `It was published ${daysDelta} days ago by ${author}.`
            });
            break;

        default:
            context.res.send({
                speech: "This is Azure Functions backend speaking. " +
                "Google Home has successfully reached me but i can't figure out " +
                "what you really want me to do. Give it another go."
            });
    }
}