from mongoengine import *
import datetime

class Records(Document):
  user_id = StringField(required = True)
  history = DictField()
  created_at = DateTimeField(default=datetime.datetime.now())


class Feedback(Document):
  user_id = StringField(required=True)
  firstname = StringField()
  lastname = StringField()
  description = StringField()
