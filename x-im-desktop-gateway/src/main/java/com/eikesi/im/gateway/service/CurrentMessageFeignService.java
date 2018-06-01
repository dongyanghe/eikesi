package com.eikesi.im.gateway.service;

import com.eikesi.im.gateway.service.dto.CurrentMessageDTO;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * rpc controller for managing CurrentMessage.
 */
@FeignClient(name = "imService")
public interface CurrentMessageFeignService {

    /**
     * POST  /current-messages : Create a new currentMessage.
     *
     * @param currentMessageDTO the currentMessageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new currentMessageDTO, or with status 400 (Bad Request) if the currentMessage has already an ID
     */
    @RequestMapping(value = "/current-messages", method = RequestMethod.POST)
    public ResponseEntity<CurrentMessageDTO> createCurrentMessage(@RequestBody CurrentMessageDTO currentMessageDTO);
    /**
     * PUT  /current-messages : Updates an existing currentMessage.
     *
     * @param currentMessageDTO the currentMessageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated currentMessageDTO,
     * or with status 400 (Bad Request) if the currentMessageDTO is not valid,
     * or with status 500 (Internal Server Error) if the currentMessageDTO couldn't be updated
     */
    @RequestMapping(value = "/current-messages", method = RequestMethod.PUT)
    public ResponseEntity<CurrentMessageDTO> updateCurrentMessage(@RequestBody CurrentMessageDTO currentMessageDTO);

    /**
     * GET  /current-messages : get all the currentMessages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of currentMessages in body
     */
    @RequestMapping(value = "/current-messages", method = RequestMethod.GET)
    public ResponseEntity<List<CurrentMessageDTO>> getAllCurrentMessages();

    /**
     * GET  /current-messages/:id : get the "id" currentMessage.
     *
     * @param id the id of the currentMessageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the currentMessageDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/current-messages/{id}", method = RequestMethod.GET)
    public ResponseEntity<CurrentMessageDTO> getCurrentMessage(@PathVariable Long id);

    /**
     * DELETE  /current-messages/:id : delete the "id" currentMessage.
     *
     * @param id the id of the currentMessageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/current-messages/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteCurrentMessage(@PathVariable Long id);
}
