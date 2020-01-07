
export class SocketConnection {
    constructor(private io: SocketIO.Server) { 
        // subscribe collision move player
    }

    public init = () => {
        this.io.on('connection', this.connection);
    }

    private connection = (socket: SocketIO.Socket) => {
        console.log('player connected with Id:', socket.id);
        //connection is up, let's add a simple simple event
        this.io.to(socket.id).emit('init', 'game configs');

        // register events
        socket.on('disconnect', this.disconnect);
        socket.on('onMove', this.onMove);

    }

    private disconnect = (reason: string) => {
        console.log('disconnected:', reason);
    }

    private onMove = (message: string) => {       
        console.log(message);
        this.io.emit('onMove', `Hello, you sent -> ${message}`);
    }

    public onCollision = (id: string, type: string) => {        
        console.log(`id: ${id} , type: ${type}`);
        this.io.to(id).emit('onCollision', type);
    }

}