# Generated by Django 4.2.7 on 2023-11-23 05:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kafka_app', '0005_alter_book_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='description',
            field=models.CharField(default='QA1 Switched On : Location-Katugasthota : Device-WebApp'),
        ),
    ]