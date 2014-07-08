import time
import json

import tornado.httpserver
import tornado.websocket
import tornado.ioloop
from tornado.ioloop import IOLoop
from tornado.ioloop import PeriodicCallback
import tornado.web

from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler

WS_PORT = 8888

file_cfg = "cfg/slides.cfg"

data = []

class MainHandler(tornado.websocket.WebSocketHandler):
	def open(self):
		self.callback = PeriodicCallback(self.send_data, 120)
		self.callback.start()
		
	def send_data(self):
		global data
		if data:
			self.write_message(data)
			print(data, "handler")
			data = []
	
	def close(self):
		self.callback.stop()


class JSONSender(PatternMatchingEventHandler):
	def on_modified(self, event):
		global data
		with open(file_cfg) as json_file:
			data = json.load(json_file)


application = tornado.web.Application([
    (r"/", MainHandler),
])				

if __name__ == "__main__":
	http_server = tornado.httpserver.HTTPServer(application)
	http_server.listen(WS_PORT)
	
	event_handler = JSONSender(patterns = [file_cfg, "*.*"], ignore_patterns = None, ignore_directories = False, case_sensitive = False)
	observer = Observer()
	observer.schedule(event_handler, path = "./cfg/", recursive = True)
	observer.start()
	
	tornado.ioloop.IOLoop.instance().start()