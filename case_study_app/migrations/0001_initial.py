# Generated by Django 3.2.12 on 2022-04-05 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='my_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('platform', models.CharField(max_length=70)),
                ('userId', models.IntegerField()),
                ('sessionId', models.IntegerField()),
                ('time', models.DecimalField(decimal_places=0, max_digits=20)),
                ('date', models.CharField(max_length=70)),
                ('interaction', models.CharField(max_length=70)),
                ('sku', models.CharField(max_length=70)),
                ('pageType', models.CharField(max_length=70)),
            ],
        ),
    ]