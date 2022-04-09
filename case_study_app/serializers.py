from rest_framework import serializers 
from .models import MyDataModel
class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyDataModel
        fields = ('id','platform','userId','sessionId','time','date','interaction','sku','pageType')