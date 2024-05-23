import os
from rest_framework.generics import GenericAPIView
from rest_framework.parsers import MultiPartParser
from .models import File
from .serializer import FileSerializer
from django.http import JsonResponse
from rest_framework import status
from analyze.utils.util import extract_colors
from urine_strip_analyzer.config import project_config
from drf_yasg.utils import swagger_auto_schema

class FileUploadView(GenericAPIView):
    serializer_class = FileSerializer
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(
        tags=['upload'],
        operation_summary='Upload a file and extract color'
    )
    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return JsonResponse({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        res = File.objects.create(file=file)
        file_name = os.path.basename(res.file.name) if res.file.name else None
        if not file_name:
            return JsonResponse({"error": "Failed to get file name"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        file_path = os.path.join(project_config.BASE_DIR, file_name)
        if not os.path.exists(file_path):
            return JsonResponse({"error": f"File {file_name} not found in media directory"}, status=status.HTTP_404_NOT_FOUND)

        colors = extract_colors(file_path)
        if not colors:
            return JsonResponse({"error": "Failed to extract colors"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return JsonResponse({
            "success": "true",
            "code": 200,
            "result": {
                'URO': colors[0],
                'BIL': colors[1],
                'KET': colors[2],
                'BLD': colors[3],
                'PRO': colors[4],
                'NIT': colors[5],
                'LEU': colors[6],
                'GLU': colors[7],
                'SG': colors[8],
                'PH': colors[9]
            }
        }, status=status.HTTP_200_OK)
