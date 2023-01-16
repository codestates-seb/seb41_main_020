package codestates.frogroup.indiego.global.fileupload;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class AwsS3Service implements ImageUploadService {

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucketName;

	public String StoreImage(MultipartFile file) {
		validateFileExists(file);
		String originalFilename = file.getOriginalFilename();
		String storeFileName = createStoreFileName(originalFilename);

		log.info("# originalFilename = {}", originalFilename);
		log.info("# storeFileName = {}", originalFilename);

		// ObjectMetadata objectMetadata = new ObjectMetadata();
		// objectMetadata.setContentType(file.getContentType());
		// log.info("getContentType = {}",file.getContentType());

		try (InputStream inputStream = file.getInputStream()) {
			// byte[] bytes = IOUtils.toByteArray(inputStream);
			// objectMetadata.setContentLength(bytes.length);
			// ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
			amazonS3.putObject(new PutObjectRequest(bucketName, storeFileName, inputStream, null)
				.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			throw new RuntimeException();
		}

		return amazonS3.getUrl(bucketName, storeFileName).toString();
	}

	private void validateFileExists(MultipartFile multipartFile) {
		if (multipartFile.isEmpty()) {
			throw new RuntimeException();
		}
	}

	private static String createStoreFileName(String originalFilename) {
		String ext = extractExt(originalFilename);
		String uuid = UUID.randomUUID().toString();

		log.info("ext = {}'",ext);
		log.info("uuid = {}",uuid);

		return uuid + "." + ext;
	}

	private static String extractExt(String originalFilename) {
		int pos = originalFilename.lastIndexOf(".");
		return originalFilename.substring(pos + 1);
	}
}
