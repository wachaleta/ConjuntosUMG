from rest_framework import serializers

class UnionSerializer(serializers.Serializer):
    primerConjunto = serializers.ListField(
        child = serializers.CharField()
    )

    segundoConjunto = serializers.ListField(
        child = serializers.CharField()
    )