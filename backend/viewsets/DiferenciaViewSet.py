from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from backend.serializers import *

class DiferenciaViewSet(APIView):
    def post(self, request):
        
        serializer = UnionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        res = []

        for item in serializer.data['primerConjunto']:
            if item not in serializer.data['segundoConjunto']:
                res.append(item)

        return Response({
            "resultado" : res
        },status=status.HTTP_200_OK)