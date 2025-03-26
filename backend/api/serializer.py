from rest_framework import serializers
from .models import Node

class NodeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Node
        fields = ['id', 'name', 'parent', 'children']

    def get_children(self, obj):
        children = obj.children.all()
        return NodeSerializer(children, many=True).data
