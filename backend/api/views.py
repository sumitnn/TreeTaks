from rest_framework import status
from rest_framework.response import Response
from .serializer import NodeSerializer
from .models import Node
from rest_framework.viewsets import ModelViewSet

# Create your views here.
class NodeViewSet(ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer

    def list(self, request, *args, **kwargs):
        nodes = Node.objects.filter(parent=None)
        serializer = self.get_serializer(nodes, many=True)
        return Response({"message": "Fetch All Nodes Successfully", "data": serializer.data})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Node Created Successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        node_id = kwargs.get('pk')
        try:
            instance = Node.objects.get(id=node_id)  
        except:
            return Response({"message":"Incorrect ID"},status=status.HTTP_400_BAD_REQUEST)
            
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Node Updated Successfully", "data": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        node_id = kwargs.get('pk')
        try:
            instance = Node.objects.get(id=node_id)  
        except:
            return Response({"message":"Incorrect ID"},status=status.HTTP_400_BAD_REQUEST)
        instance.delete()
        return Response({"message": "Node Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT)