from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Recipe
from .serializers import RecipeSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    @action(detail=False, methods=['get'])
    def search(self, request):
        title = request.query_params.get('title', '')
        if title:
            recipes = Recipe.objects.filter(title__icontains=title)
        else:
            recipes = Recipe.objects.all()

        serializer = self.get_serializer(recipes, many=True)
        return Response(serializer.data)
