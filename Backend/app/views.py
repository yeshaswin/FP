
from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib import auth
# Rest framework stuff
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect

# Import task serializer

from .serializers import *
from .models import *

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
userr =NULL
@api_view(['POST'])
def loginin(request):
    global userr
    """
    function check the authentication of the user using post data.
    redirect to home page if logged in, else return back to login page
    """
    username = request.data['username']
    password = request.data['password']
    request.session['username'] = username
    user = auth.authenticate(username=username, password=password)
    if user is not None:
        userr=user
        auth.login(request,user)
        print(request.user,request.user.id,"useskfnskdnr")

        return Response(user.id)
    else:
        request.session['msg']="Invalid Username or Password"
        return Response()
@api_view(['GET'])
def uauth(request):
    print(request)
    return Response(userr)
@api_view(['POST'])
def logout(request):
    global userr
    print(request.data)
    userr=NULL
    auth.logout(request)

    return Response(request.data)

@api_view(['GET'])
def apioverview(request):
    api_urls = {
        'list': '/task-list',
        'detail': '/task-detail/<int:pk>',
        'create': '/task-create',
        'update': '/task-update/<int:pk>',
        'delete': '/task-delete/<int:pk>',
    }
    return Response(api_urls)


@api_view(['GET'])
def tasklist(request):
    print(userr,userr.id,"user")
    # if  request.user.is_authenticated:
    all_tasks = Task.objects.all().filter(
        uname=userr.id)
    serializer = TaskSerializer(all_tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def taskdetail(request, pk):
    tasks = Task.objects.get(pk=pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def taskcreate(request):
    print("hello"*10,request.data)
    serializer = TaskSerializer(data=request.data)
    print(type(request.FILES),serializer,serializer.is_valid(),"validation")
    print(serializer.errors,"errorrs")
    if serializer.is_valid():
        serializer.save()

    return Response(request.data)



@api_view(['PUT'])
def taskupdate(request, pk):
    task = Task.objects.get(pk=pk)
    serializer = TaskSerializer(instance=task, data=request.data)
    print(request.data,"i am",serializer.is_valid(),serializer.errors)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def taskdelete(request, pk):
    task = Task.objects.get(pk=pk)
    task.delete()
    return Response("Item successfully deleted!")
