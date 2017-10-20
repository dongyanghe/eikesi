package com.eikesi.gateway.client;

import com.eikesi.gateway.domain.Snapshot;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 镜像客户端链接调用
 * <p>
 * @PathVariable("id") Long id,
 * defect:未使用Apache HTTP Client控制连接
 * defect:未引入Hystrix控制依赖
 */
@FeignClient("snapshot")
public interface SnapshotClient {

    @RequestMapping(method = RequestMethod.GET, value = "/api/snapshot/{id}", consumes = "application/json")
    ResponseEntity<Snapshot> get(@PathVariable("id") Long id);

    @RequestMapping(method = RequestMethod.POST, value = "/api/snapshot", consumes = "application/json")
    ResponseEntity<Snapshot> save(@RequestParam("obj") Object obj);
}
