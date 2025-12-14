from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User  # Use Django's built-in User for companies/applicants

class Job(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    company = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')  # Assuming companies are users
    location = models.CharField(max_length=100, blank=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

# Optional: Add an Applicant model later for job applications
class Applicant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/', blank=True)
    applied_at = models.DateTimeField(auto_now_add=True)