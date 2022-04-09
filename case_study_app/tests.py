from django.test import TestCase
from .models import MyDataModel

# Create your tests here.
class MyDataModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        MyDataModel.objects.create(pageType='browsing',interaction='impression',sku='GE810MW0ADSXHNAFAMZ',sessionId='1646430969',userId='1086149', platform='app',time='1646430000000',date='1/2/2022')
        
    def test_user_id_label(self):
        my_data = MyDataModel.objects.get(id=1)
        field_label = my_data._meta.get_field('userId').verbose_name
        self.assertEqual(field_label, 'userId')

    def test_platform_label(self):
        my_data = MyDataModel.objects.get(id=1)
        field_label = my_data._meta.get_field('platform').verbose_name
        self.assertEqual(field_label, 'platform')

    def test_time_label(self):
        my_data = MyDataModel.objects.get(id=1)
        field_label = my_data._meta.get_field('time').verbose_name
        self.assertEqual(field_label, 'time')
        
    def test_date_label(self):
        my_data = MyDataModel.objects.get(id=1)
        field_label = my_data._meta.get_field('date').verbose_name
        self.assertEqual(field_label, 'date')
        
    def test_interaction_label(self):
        my_data = MyDataModel.objects.get(id=1)
        field_label = my_data._meta.get_field('interaction').verbose_name
        self.assertEqual(field_label, 'interaction')
        
    def test_sku_label(self):
        my_data = MyDataModel.objects.get(id=1)
        field_label = my_data._meta.get_field('sku').verbose_name
        self.assertEqual(field_label, 'sku')
        
    def test_pageType_label(self):
        my_data = MyDataModel.objects.get(id=1)
        field_label = my_data._meta.get_field('pageType').verbose_name
        self.assertEqual(field_label, 'pageType')