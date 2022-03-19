function PubSub() {
    this.handlers = [];
}

PubSub.prototype.subscribe = function(event, handler, context) {
    if (typeof context === 'undefined') {
        context = handler;
    } 
    this.handlers.push({
        event: event,
        handler: handler.bind(context)
    });
}

PubSub.prototype.publish = function(event, args) {
    this.handlers.forEach( handler => {
        if(handler.event === event) {
            handler.handler(args);
        }
    })
}


const pubsub = new PubSub();