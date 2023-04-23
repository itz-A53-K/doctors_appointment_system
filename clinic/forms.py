from django import forms
  
DAYS_OF_WEEK = (
    ("Mon", ("Monday")),
    ("Tue", ("Tuesday")),
    ("Wed", ("Wednesday")),
    ("Thu", ("Thursday")),
    ("Fri", ("Friday")),
    ("Sat", ("Saturday")),
    ("Sun", ("Sunday")),
)
class addDoct_form(forms.Form):
    Name= forms.CharField(max_length=200, required=True)
    Email= forms.EmailField(max_length=254, required=True)
    Phone= forms.IntegerField(required=True)
    degrees= forms.CharField(max_length=100, required=True)
    available_day= forms.MultipleChoiceField(choices=DAYS_OF_WEEK, required=True)
    view_Patient_per_day= forms.IntegerField(required=True)
    
