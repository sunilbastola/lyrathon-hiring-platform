from rest_framework import serializers
from .models import Job, Applicant

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'  # Or specify fields like ['id', 'title', 'description', 'company', 'location', 'salary']

class ApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = '__all__'