Long task
=========

Given the web server implementation, from the previous `web-server` exercise, consider the following tasks:

1.	Implement WebSocket communication between client and server
2.	Create a socket event handler `start:ping` that spawns `ping -c 10 -i 20 127.0.0.1` in a new process
3.	Create a button on the interface which triggers the event when pressed
4.	Use the WebSocket implementation to notify all clients about task's outcome
5.	Handle the notification client-side, using `toastr` to display the outcome

Hints:

-	Use [socket.io](http://socket.io/) for the WebSocket implementation. AngularJS [module](https://github.com/btford/angular-socket-io).
