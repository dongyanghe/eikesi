package com.eikesi.im.geteway.service;

import com.eikesi.im.gateway.domain.CurrentMessage;
import com.eikesi.im.gateway.repository.CurrentMessageRepository;
import com.eikesi.im.gateway.service.dto.CurrentMessageDTO;
import com.eikesi.im.gateway.service.mapper.CurrentMessageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/current-messages", method = RequestMethod.Post)
    public CurrentMessageDTO createCurrentMessage(@RequestBody CurrentMessageDTO currentMessageDTO);
    /**
     * PUT  /current-messages : Updates an existing currentMessage.
     *
     * @param currentMessageDTO the currentMessageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated currentMessageDTO,
     * or with status 400 (Bad Request) if the currentMessageDTO is not valid,
     * or with status 500 (Internal Server Error) if the currentMessageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/current-messages", method = RequestMethod.Put)
    public CurrentMessageDTO updateCurrentMessage(@RequestBody CurrentMessageDTO currentMessageDTO);

    /**
     * GET  /current-messages : get all the currentMessages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of currentMessages in body
     */
    @RequestMapping(value = "/current-messages", method = RequestMethod.Get)
    public List<CurrentMessageDTO> getAllCurrentMessages();

    /**
     * GET  /current-messages/:id : get the "id" currentMessage.
     *
     * @param id the id of the currentMessageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the currentMessageDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/current-messages/{id}", method = RequestMethod.Get)
    public CurrentMessageDTO getCurrentMessage(@PathVariable Long id);

    /**
     * DELETE  /current-messages/:id : delete the "id" currentMessage.
     *
     * @param id the id of the currentMessageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/current-messages/{id}", method = RequestMethod.Delete)
    public void deleteCurrentMessage(@PathVariable Long id);
}
