# Generated by Django 4.2.7 on 2023-12-14 08:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kafka_app', '0032_delete_measurements'),
    ]

    operations = [
        migrations.CreateModel(
            name='Measurements',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.CharField(max_length=50)),
                ('ioa', models.CharField(max_length=20)),
                ('value', models.CharField(max_length=20)),
                ('description', models.CharField(default='Description')),
                ('topic', models.CharField(default='topic')),
            ],
        ),
    ]
